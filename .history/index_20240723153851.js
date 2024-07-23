require('dotenv').config()
const arbitrage = require('./src/arbitrage')
const scheduler = require('./src/scheduler')

arbitrage()
scheduler()
