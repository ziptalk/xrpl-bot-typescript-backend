const fs = require('fs')
const path = require('path')

const logFile = path.join(__dirname, '../logs/arbitrage.log')

function logArbitrageOpportunity(message) {
    const logMessage = `${new Date().toISOString()} - ARBITRAGE OPPORTUNITY: ${message}\n`
    fs.appendFileSync(logFile, logMessage)
}

function logTransaction(type, currency, price) {
    const logMessage = `${new Date().toISOString()} - ${type.toUpperCase()} ${currency} at ${price}\n`
    fs.appendFileSync(logFile, logMessage)
}

module.exports = { logArbitrageOpportunity, logTransaction }
