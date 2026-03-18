# Kalshi Trading Strategy: LMSR + Kelly Sizing

## Core Concept
Don't predict outcomes. Exploit the formula.

Most Kalshi traders see a price and guess if it's high or low. We read the **liquidity-based pricing formula** and find EV.

## The Math

### 1. Kalshi Pricing (Likely LMSR variant)
```
P(yes) = exp(q_yes / b) / (exp(q_yes / b) + exp(q_no / b))
```

Where:
- `q` = quantity of tokens issued for each side
- `b` = liquidity parameter (lower = thinner market, higher slippage)
- `P` = market-implied probability

### 2. Expected Value (EV)
```
EV = P_true × (1 - Price) - (1 - P_true) × Price
```

- If EV > 0: BUY (underpriced)
- If EV < 0: SKIP (overpriced)
- If EV ≈ 0: fair value

### 3. Kelly Criterion (Optimal Sizing)
```
f* = (p × b - q) / b
```

Where:
- `f*` = fraction of bankroll to risk
- `p` = probability of winning
- `b` = odds (in our case, inverse of price ratio)

## Bot Behavior

1. **Scan markets** every 1 minute
2. **Calculate b** (extract from order book depth)
3. **Find EV opportunities** (|EV| > 0.02 threshold)
4. **Size positions** with Kelly (max 10% per trade)
5. **Execute** at best available price
6. **Track** positions and adjust

## Risk Management

- Max 10% of bankroll per trade (Kelly-sized)
- Min market depth before executing (avoid thin pool disasters)
- Stop loss: -15% from entry on any position
- Portfolio hedge: maintain 30% cash reserve

## Success Metrics

Track:
- Win rate (target: 55%+)
- EV captured vs. expected
- Slippage vs. predicted
- Kelly alignment (actual returns vs. theoretical)

## Starting Capital
- $100 total
- $50 active (trading)
- $50 reserve (emergency/rebalance)
