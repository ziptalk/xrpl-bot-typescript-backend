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
    environment: 'testnet', // 'mainnet' or 'testnet'
    notifyEmail: 'your-email@example.com'
}
