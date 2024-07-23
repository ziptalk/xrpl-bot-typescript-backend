require('dotenv').config()

module.exports = {
    API_KEY: process.env.API_KEY,
    API_SECRET: process.env.API_SECRET,
    testnetServer: 'wss://s.altnet.rippletest.net:51233',
    mainnetServer: 'wss://s2.ripple.com',
    seed: process.env.SEED,
    assets: [
        { currency: 'XRP' },
        { currency: 'USD', issuer: 'rExampleIssuerAddress' },
        { currency: 'WBTC', issuer: 'rExampleIssuerAddress' },
        { currency: 'WETH', issuer: 'rExampleIssuerAddress' }
    ],
    environment: process.env.ENVIRONMENT, // 'mainnet' or 'testnet'
    notifyEmail: process.env.NOTIFY_EMAIL,
    emailPassword: process.env.EMAIL_PASSWORD,
    retryInterval: 60000, // 1 minute
    feeMultiplier: 1.1, // 10% fee buffer
    maxLoss: 0.1, // Maximum allowable loss per trade (in asset units)
    minProfit: 0.05, // Minimum profit to execute a trade (in asset units)
    minSlotPrice: 0.01, // Minimum price for auction slot (in LP tokens)
    useAMM: process.env.USE_AMM === 'true' // Whether to use AMM or not
}
