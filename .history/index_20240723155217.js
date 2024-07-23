require('dotenv').config()
const arbitrage = require('./src/arbitrage')
const scheduler = require('./src/scheduler')
const server = require('./src/server')

arbitrage()
scheduler()
server()
