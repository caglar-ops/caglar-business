#!/usr/bin/env python3
"""
Unit tests for Kalshi Trading Bot
"""

import pytest
import math
from kalshi_bot import KalshiBot


class TestKalshiBot:
    """Test KalshiBot class"""
    
    @pytest.fixture
    def bot(self):
        """Create bot instance for testing"""
        return KalshiBot()
    
    def test_initialization(self, bot):
        """Test bot initialization"""
        assert bot.bankroll == 100
        assert bot.active_capital == 50
        assert bot.positions == {}
        assert bot.trades == []
    
    def test_softmax_probability(self, bot):
        """Test LMSR pricing formula"""
        # Equal quantities should give 50% probability
        prob = bot.softmax_probability(1000, 1000, 1000)
        assert abs(prob - 0.5) < 0.01
        
        # More YES should give higher probability
        prob_high = bot.softmax_probability(2000, 1000, 1000)
        assert prob_high > 0.5
        
        # More NO should give lower probability
        prob_low = bot.softmax_probability(1000, 2000, 1000)
        assert prob_low < 0.5
    
    def test_softmax_edge_cases(self, bot):
        """Test LMSR edge cases"""
        # Very extreme quantities
        prob = bot.softmax_probability(10000, 100, 100)
        assert prob > 0.99
        
        # Overflow protection
        prob = bot.softmax_probability(1e10, 1e10, 1)
        assert 0 <= prob <= 1
    
    def test_calculate_ev_positive(self, bot):
        """Test EV calculation for positive EV"""
        # If true prob 60% and price 40%
        ev = bot.calculate_ev(0.40, 0.60)
        assert ev > 0  # Positive EV (underpriced)
    
    def test_calculate_ev_negative(self, bot):
        """Test EV calculation for negative EV"""
        # If true prob 40% and price 60%
        ev = bot.calculate_ev(0.60, 0.40)
        assert ev < 0  # Negative EV (overpriced)
    
    def test_calculate_ev_fair(self, bot):
        """Test EV calculation at fair value"""
        # If true prob equals market price
        ev = bot.calculate_ev(0.50, 0.50)
        assert abs(ev) < 0.001  # Near zero
    
    def test_calculate_ev_edge_cases(self, bot):
        """Test EV calculation edge cases"""
        # Price at extremes should return 0
        ev = bot.calculate_ev(0.0, 0.50)
        assert ev == 0
        
        ev = bot.calculate_ev(1.0, 0.50)
        assert ev == 0
    
    def test_kelly_sizing_positive_ev(self, bot):
        """Test Kelly sizing with positive EV"""
        size = bot.kelly_sizing(0.05, 0.50)
        assert 5 <= size <= 50
        assert size > 0
    
    def test_kelly_sizing_negative_ev(self, bot):
        """Test Kelly sizing rejects negative EV"""
        size = bot.kelly_sizing(-0.05, 0.50)
        assert size == 0
    
    def test_kelly_sizing_respects_max(self, bot):
        """Test Kelly sizing respects max position"""
        # Very high EV should still respect 10% max
        size = bot.kelly_sizing(1.0, 0.50)
        assert size <= 5  # 10% of $50 active capital
    
    def test_liquidity_param_estimation(self, bot):
        """Test liquidity parameter extraction"""
        market_high_volume = {"volume_24h": 100000}
        b_high = bot.calculate_liquidity_param(market_high_volume)
        assert b_high > 50
        
        market_low_volume = {"volume_24h": 1000}
        b_low = bot.calculate_liquidity_param(market_low_volume)
        assert b_low > 50
        
        # Higher volume should give higher b
        assert b_high >= b_low
    
    def test_find_ev_opportunities_empty_markets(self, bot):
        """Test finding opportunities with empty market list"""
        opportunities = bot.find_ev_opportunities([])
        assert opportunities == []
    
    def test_find_ev_opportunities_thin_markets(self, bot):
        """Test filtering out thin markets"""
        thin_market = {
            "id": "market_1",
            "title": "Thin Market",
            "yes_price": 0.50,
            "yes_quantity": 100,
            "no_quantity": 100,
            "volume_24h": 100  # Below 1000 threshold
        }
        opportunities = bot.find_ev_opportunities([thin_market])
        assert len(opportunities) == 0  # Should be filtered
    
    def test_trade_execution(self, bot):
        """Test trade execution"""
        opportunity = {
            "market_id": "market_1",
            "market_title": "Test Market",
            "yes_price": 0.50,
            "implied_prob": 0.48,
            "true_prob": 0.55,
            "ev": 0.05,
            "size": 25,
            "liquidity_param_b": 1000,
            "volume_24h": 50000,
            "side": "YES"
        }
        
        trade = bot.execute_trade(opportunity)
        
        assert trade["market_id"] == "market_1"
        assert trade["side"] == "YES"
        assert len(bot.trades) == 1
        assert "market_1" in bot.positions
    
    def test_multiple_positions(self, bot):
        """Test maintaining multiple positions"""
        for i in range(3):
            opportunity = {
                "market_id": f"market_{i}",
                "market_title": f"Test Market {i}",
                "yes_price": 0.50,
                "implied_prob": 0.48,
                "true_prob": 0.55,
                "ev": 0.05,
                "size": 10,
                "liquidity_param_b": 1000,
                "volume_24h": 50000,
                "side": "YES"
            }
            bot.execute_trade(opportunity)
        
        assert len(bot.positions) == 3
        assert len(bot.trades) == 3


class TestEdgeCases:
    """Test edge cases and error handling"""
    
    def test_zero_ev_threshold(self):
        """Test with zero EV threshold"""
        bot = KalshiBot()
        market = {
            "id": "m1",
            "title": "Test",
            "yes_price": 0.50,
            "yes_quantity": 1000,
            "no_quantity": 1000,
            "volume_24h": 50000
        }
        opps = bot.find_ev_opportunities([market], ev_threshold=0)
        # Should find opportunities even at EV=0
        assert isinstance(opps, list)
    
    def test_extremely_high_ev(self):
        """Test with extremely high EV"""
        bot = KalshiBot()
        # EV of 1.0 (impossible but edge case)
        size = bot.kelly_sizing(1.0, 0.50)
        assert size > 0
        assert size <= 50
    
    def test_missing_market_fields(self):
        """Test handling of missing market fields"""
        bot = KalshiBot()
        market = {
            "id": "m1",
            "title": "Incomplete Market",
            # Missing yes_price, yes_quantity, no_quantity, volume_24h
        }
        opps = bot.find_ev_opportunities([market])
        # Should handle gracefully
        assert isinstance(opps, list)


class TestIntegration:
    """Integration tests"""
    
    def test_full_opportunity_pipeline(self):
        """Test full pipeline: markets -> opportunities -> execution"""
        bot = KalshiBot()
        
        # Create test markets
        markets = [
            {
                "id": "m1",
                "title": "Market A",
                "yes_price": 0.45,
                "yes_quantity": 5000,
                "no_quantity": 5000,
                "volume_24h": 100000
            },
            {
                "id": "m2",
                "title": "Market B",
                "yes_price": 0.55,
                "yes_quantity": 5000,
                "no_quantity": 5000,
                "volume_24h": 50000
            }
        ]
        
        # Find opportunities
        opps = bot.find_ev_opportunities(markets)
        
        # Should find some opportunities
        assert isinstance(opps, list)
        assert all("market_id" in opp for opp in opps)
        
        # Execute top opportunity
        if opps:
            trade = bot.execute_trade(opps[0])
            assert trade is not None


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
