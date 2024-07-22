const express = require('express');
const Web3 = require('web3');
const Contract = require('@truffle/contract');
const ArbitrageContractArtifact = require('./build/contracts/ArbitrageContract.json');
const axios = require('axios');
const RippleAPI = require('ripple-lib').RippleAPI;

const app = express();
const port = 3000;

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const ArbitrageContract = Contract(ArbitrageContractArtifact);
ArbitrageContract.setProvider(web3.currentProvider);

const api = new RippleAPI({ server: 'wss://s1.ripple.com' });

app.use(express.json());

app.post('/deposit', async (req, res) => {
    const { user, amount, token } = req.body;
    const accounts = await web3.eth.getAccounts();
    const arbitrageContract = await ArbitrageContract.deployed();
    await arbitrageContract.deposit(amount, token, { from: user });
    res.send('Deposit successful');
});

app.post('/execute-arbitrage', async (req, res) => {
    const { user, token } = req.body;
    const accounts = await web3.eth.getAccounts();
    const arbitrageContract = await ArbitrageContract.deployed();
    const profit = await arbitrageContract.calculateArbitrageProfit.call(user, token);

    if (profit > 0) {
        // Execute trade on XRPL
        await api.connect();
        const payment = {
            source: {
                address: 'rXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                maxAmount: { value: '100', currency: 'XRP' }
            },
            destination: {
                address: 'rYYYYYYYYYYYYYYYYYYYYYYYYYY',
                amount: { value: '100', currency: 'USD' }
            }
        };
        const prepared = await api.preparePayment('rXXXXXXXXXXXXXXXXXXXXXXXXXXX', payment);
        const signed = api.sign(prepared.txJSON, 's█████████████████████████████');
        await api.submit(signed.signedTransaction);
        await api.disconnect();

        await arbitrageContract.executeArbitrage(user, token, { from: accounts[0] });
        res.send('Arbitrage executed');
    } else {
        res.send('No arbitrage opportunity');
    }
});

async function fetchXrplPrices() {
    await api.connect();
    const response = await api.request('book_offers', {
        taker_gets: { currency: 'XRP' },
        taker_pays: { currency: 'USD' }
    });
    await api.disconnect();
    return response.offers;
}

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
