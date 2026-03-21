# Kalshi Trading Bot - Mirror Trading System

An automated trading bot for Kalshi that mirrors the trades of top-performing traders, with real-time P&L tracking and dashboard analytics.

## Features

- **Top Trader Monitoring**: Automatically identifies and follows the top 3 most profitable traders
- **Automated Mirror Trading**: Executes trades on your account whenever monitored traders make moves
- **Real-Time P&L Dashboard**: Web-based dashboard showing:
  - Current open positions
  - Daily P&L and win rate
  - Copied trader strategies
  - Trade history and performance metrics
- **Secure Credentials**: Encrypted API key storage
- **Demo & Live Trading**: Switch between demo and live trading modes

## Quick Start

### Prerequisites
- Node.js 16+
- Kalshi API credentials (from https://kalshi.com)

### Installation

```bash
# Clone and install
git clone <repo>
cd kalshi-bot
npm install

# Configure environment
cp .env.example .env
# Edit .env with your settings and API keys

# Run the bot
npm start

# In another terminal, start the dashboard
npm run dashboard
```

### First Run

1. The bot will authenticate with Kalshi API
2. It will identify top traders on the leaderboard
3. It will start monitoring their trades
4. Dashboard will be available at `http://localhost:3001`

## Architecture

```
kalshi-bot/
├── src/
│   ├── index.js              # Main entry point
│   ├── api/
│   │   ├── kalshi-client.js  # Kalshi API wrapper
│   │   └── leaderboard.js    # Trader leaderboard fetcher
│   ├── trading/
│   │   ├── trader-monitor.js # Monitor top traders
│   │   ├── mirror-engine.js  # Execute mirror trades
│   │   └── position-tracker.js # Track open positions
│   ├── db/
│   │   ├── database.js       # SQLite setup
│   │   └── migrations.js     # Database schema
│   ├── config/
│   │   └── config-manager.js # Encrypted config storage
│   └── utils/
│       ├── logger.js         # Logging utility
│       └── validator.js      # Input validation
├── dashboard/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│   └── package.json
├── tests/
├── .env.example
├── .gitignore
└── README.md
```

## Configuration

### Environment Variables

- `KALSHI_API_BASE`: Kalshi API endpoint (production)
- `KALSHI_DEMO_BASE`: Kalshi demo API endpoint
- `DEMO_MODE`: Use demo trading (true/false)
- `INITIAL_BALANCE`: Starting capital in dollars
- `MAX_POSITION_SIZE`: Max % of balance per trade
- `MIRROR_DELAY_MS`: Delay before mirroring trade (for research)
- `CHECK_INTERVAL_MS`: How often to check for new trader moves

### Secure Credential Storage

API keys are encrypted using bcrypt and stored in `.kalshi-config.json`. The encryption key is derived from your environment and rotated periodically.

## API Integration

The bot uses:
- **REST API**: Trade execution, market data, account management
- **WebSocket API**: Real-time market data and order updates
- **Leaderboard API**: Identify top traders

## Trading Logic

1. **Fetch Top Traders**: Query leaderboard API every 1 minute for top 3 traders
2. **Monitor Trades**: Watch their recent transactions via WebSocket
3. **Mirror Decision**: 
   - Check trade profitability threshold (configurable)
   - Validate market conditions
   - Execute mirror trade at same proportion
4. **Track P&L**: Update position metrics every tick
5. **Report**: Send analytics to dashboard

## P&L Dashboard

The dashboard shows:
- **Portfolio Overview**: Current balance, equity, daily P&L
- **Open Positions**: All active trades with unrealized P&L
- **Watched Traders**: Top traders being followed with their performance
- **Trade History**: Recent trades with execution time and P&L
- **Statistics**: Win rate, average trade size, most profitable strategy

## Security Notes

⚠️ **Never commit `.env` or `.kalshi-config.json` to version control**

- API credentials are encrypted at rest
- WebSocket connections use TLS
- All API requests are authenticated
- Trade amounts are limited to prevent catastrophic losses

## Development

```bash
# Install dev dependencies
npm install --save-dev

# Run tests
npm test

# Start with nodemon for hot reload
npm run dev

# Lint code
npm run lint
```

## Troubleshooting

### Authentication Failed
- Verify API keys are correct in `.env`
- Check that credentials are properly encrypted
- Try regenerating API keys on Kalshi

### No Trades Executing
- Verify DEMO_MODE setting matches your account type
- Check that top traders have recent activity
- Review logs in `./logs/`

### Dashboard Not Loading
- Ensure dashboard port (3001) is not in use
- Check CORS settings if accessing remotely
- Verify WebSocket connection in browser console

## Disclaimer

This bot mirrors professional traders but is not financial advice. Past performance does not guarantee future results. Start with small amounts and test thoroughly in demo mode before using real capital.

## License

MIT

## Support

For issues or questions:
1. Check logs: `tail -f logs/kalshi-bot.log`
2. Review Kalshi API docs: https://docs.kalshi.com
3. Check GitHub issues
