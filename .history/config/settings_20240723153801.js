module.exports = {
    testnetServer: 'wss://s.altnet.rippletest.net:51233',
    mainnetServer: 'wss://s2.ripple.com',
    seed: 'YOUR_SEED',
    assets: [
        { currency: 'XRP' },
        { currency: 'USD', issuer: 'rExampleIssuerAddress' },
        { currency: 'WBTC', issuer: 'rExampleIssuerAddress' },
        { currency: 'WETH', issuer: 'rExampleIssuerAddress' }
    ],
    environment: process.env.ENVIRONMENT, // 'mainnet' or 'testnet'
    notifyEmail: process.env.NOTIFY_EMAIL,
    emailPassword: process.env.EMAIL_PASSWORD,
    retryInterval: 60000 // 1 minute
}
