const xrpl = require('xrpl')
const { seed } = require('../config/settings')

const wallet = xrpl.Wallet.fromSeed(seed)

module.exports = wallet
