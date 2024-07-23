const xrpl = require('xrpl')
const { seed } = require('../config/settings')

// SEED 값이 올바른지 확인
if (!seed || seed.length < 29) {
    throw new Error('Invalid SEED value. Please check your .env file.')
}

try {
    const wallet = xrpl.Wallet.fromSeed(seed)
    console.log('Wallet successfully created:', wallet)
} catch (error) {
    console.error('Error creating wallet:', error)
    throw error
}

module.exports = wallet
