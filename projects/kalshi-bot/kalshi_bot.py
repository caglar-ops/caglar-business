#!/usr/bin/env python3
"""
Kalshi Trading Bot - LMSR + Kelly Sizing
Exploits liquidity-based pricing formula, not outcome prediction
"""

import json
import os
import sys
import time
import requests
import hashlib
import hmac
from datetime import datetime
from pathlib import Path
import math

# Load Kalshi config
CONFIG_PATH = Path(__file__).parent.parent.parent / ".kalshi-config.json"
with open(CONFIG_PATH) as f:
    KALSHI_CONFIG = json.load(f)

KEY_ID = KALSHI_CONFIG["key_id"]
PRIVATE_KEY_PATH = Path(__file__).parent.parent.parent / KALSHI_CONFIG["private_key_path"]
API_URL = KALSHI_CONFIG["api_url"]
STARTING_CAPITAL = KALSHI_CONFIG["starting_capital"]
TARGET_DAILY_PROFIT = KALSHI_CONFIG["target_daily_profit"]

class KalshiBot:
    def __init__(self):
        self.key_id = KEY_ID
        self.private_key = self._load_private_key()
        self.api_url = API_URL
        self.bankroll = STARTING_CAPITAL
        self.active_capital = 50  # Start trading with $50
        self.positions = {}
        self.trades = []
        self.session = requests.Session()
        
    def _load_private_key(self):
        """Load RSA private key"""
        with open(PRIVATE_KEY_PATH) as f:
            return f.read()
    
    def _sign_request(self, method, path, body=""):
        """Sign API request with RSA"""
        timestamp = str(int(time.time() * 1000))
        message = f"{method}{path}{timestamp}{body}"
        
        # In production, use proper RSA signing
        # For now, return mock signature
        signature = hashlib.sha256(message.encode()).hexdigest()
        
        return {
            "KALSHI-KEY-ID": self.key_id,
            "KALSHI-SIGNATURE": signature,
            "KALSHI-TIMESTAMP": timestamp
        }
    
    def get_markets(self, limit=20):
        """Fetch available markets"""
        try:
            path = f"/markets?limit={limit}"
            headers = self._sign_request("GET", path)
            response = self.session.get(f"{self.api_url}{path}", headers=headers, timeout=10)
            
            if response.status_code == 200:
                return response.json().get("markets", [])
            else:
                print(f"Error fetching markets: {response.status_code}")
                return []
        except Exception as e:
            print(f"Error: {e}")
            return []
    
    def calculate_liquidity_param(self, market):
        """
        Extract liquidity parameter (b) from market order book
        Lower b = thinner market, higher slippage risk
        """
        try:
            # In real implementation, analyze order book depth
            # For now, estimate based on market volume
            volume = market.get("volume_24h", 10000)
            
            # Simple heuristic: higher volume = higher liquidity param
            b = min(100000, max(50, volume / 100))
            return b
        except:
            return 1000  # Default safe estimate
    
    def softmax_probability(self, q_yes, q_no, b):
        """
        LMSR pricing formula
        P(YES) = exp(q_yes / b) / (exp(q_yes / b) + exp(q_no / b))
        """
        try:
            exp_yes = math.exp(q_yes / b)
            exp_no = math.exp(q_no / b)
            return exp_yes / (exp_yes + exp_no)
        except:
            return 0.5  # Fallback if overflow
    
    def calculate_ev(self, market_price, true_prob):
        """
        Expected Value
        EV = P_true × (1 - market_price) - (1 - P_true) × market_price
        """
        if market_price <= 0 or market_price >= 1:
            return 0
        
        ev = true_prob * (1 - market_price) - (1 - true_prob) * market_price
        return ev
    
    def kelly_sizing(self, ev, market_price):
        """
        Kelly Criterion sizing
        f* = (p × b - q) / b
        Simplified for fixed odds environment
        """
        if ev <= 0:
            return 0
        
        # Adjust kelly for prediction confidence
        kelly_fraction = min(0.1, abs(ev) * 0.5)  # Max 10% per trade
        size = self.active_capital * kelly_fraction
        
        return max(5, min(50, size))  # Min $5, max $50 per trade
    
    def find_ev_opportunities(self, markets, ev_threshold=0.02):
        """Find markets with positive EV"""
        opportunities = []
        
        for market in markets:
            try:
                market_id = market.get("id")
                yes_price = market.get("yes_price", 0.5)
                no_price = 1 - yes_price
                
                # Extract liquidity
                b = self.calculate_liquidity_param(market)
                
                # Check market depth for execution safety
                volume_24h = market.get("volume_24h", 0)
                if volume_24h < 1000:
                    continue  # Skip thin markets
                
                # Calculate implied probability from pricing
                q_yes = market.get("yes_quantity", 1000)
                q_no = market.get("no_quantity", 1000)
                implied_prob = self.softmax_probability(q_yes, q_no, b)
                
                # For now, use simple momentum: if price moved up, prob went up
                # In production: use fundamental analysis, sentiment, etc.
                true_prob = implied_prob + (0.01 if yes_price > 0.45 else -0.01)
                true_prob = max(0.1, min(0.9, true_prob))
                
                # Calculate EV
                ev = self.calculate_ev(yes_price, true_prob)
                
                if abs(ev) > ev_threshold:
                    size = self.kelly_sizing(ev, yes_price)
                    opportunities.append({
                        "market_id": market_id,
                        "market_title": market.get("title", "Unknown"),
                        "yes_price": yes_price,
                        "implied_prob": implied_prob,
                        "true_prob": true_prob,
                        "ev": ev,
                        "size": size,
                        "liquidity_param_b": b,
                        "volume_24h": volume_24h,
                        "side": "YES" if ev > 0 else "NO"
                    })
            except Exception as e:
                print(f"Error analyzing market: {e}")
                continue
        
        return sorted(opportunities, key=lambda x: abs(x["ev"]), reverse=True)
    
    def execute_trade(self, opportunity):
        """Execute a trade on Kalshi"""
        print(f"\n📊 TRADE OPPORTUNITY:")
        print(f"  Market: {opportunity['market_title']}")
        print(f"  Side: {opportunity['side']}")
        print(f"  Price: ${opportunity['yes_price']:.2f}")
        print(f"  True Prob: {opportunity['true_prob']:.1%}")
        print(f"  EV: {opportunity['ev']:.4f}")
        print(f"  Size: ${opportunity['size']:.2f}")
        print(f"  Liquidity (b): {opportunity['liquidity_param_b']:.0f}")
        
        # In production: execute actual API call
        # For now: log and simulate
        trade = {
            "timestamp": datetime.now().isoformat(),
            "market_id": opportunity["market_id"],
            "side": opportunity["side"],
            "price": opportunity["yes_price"],
            "size": opportunity["size"],
            "ev": opportunity["ev"],
            "status": "simulated"
        }
        
        self.trades.append(trade)
        self.positions[opportunity["market_id"]] = opportunity
        
        return trade
    
    def run_scan(self):
        """Scan markets for EV opportunities"""
        print(f"\n{'='*60}")
        print(f"🤖 KALSHI BOT SCAN - {datetime.now().isoformat()}")
        print(f"Bankroll: ${self.bankroll:.2f} | Active: ${self.active_capital:.2f}")
        print(f"{'='*60}")
        
        # Fetch markets
        markets = self.get_markets(limit=50)
        if not markets:
            print("⚠️  No markets fetched")
            return
        
        print(f"📈 Scanning {len(markets)} markets...")
        
        # Find EV opportunities
        opportunities = self.find_ev_opportunities(markets, ev_threshold=0.02)
        
        if opportunities:
            print(f"\n✅ Found {len(opportunities)} EV opportunities:")
            for i, opp in enumerate(opportunities[:3], 1):
                print(f"\n  {i}. {opp['market_title']}")
                print(f"     EV: {opp['ev']:.4f} | Side: {opp['side']} @ ${opp['yes_price']:.2f}")
                print(f"     Size: ${opp['size']:.2f} | Volume 24h: ${opp['volume_24h']:.0f}")
                
                # Execute top opportunity
                if i == 1:
                    self.execute_trade(opp)
        else:
            print("❌ No high-EV opportunities found")
    
    def save_report(self):
        """Save trading report"""
        report = {
            "timestamp": datetime.now().isoformat(),
            "bankroll": self.bankroll,
            "active_capital": self.active_capital,
            "total_trades": len(self.trades),
            "open_positions": len(self.positions),
            "trades": self.trades,
            "positions": self.positions
        }
        
        report_path = Path(__file__).parent / f"report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        with open(report_path, "w") as f:
            json.dump(report, f, indent=2)
        
        print(f"\n📝 Report saved to {report_path}")
        return report

if __name__ == "__main__":
    bot = KalshiBot()
    bot.run_scan()
    bot.save_report()
