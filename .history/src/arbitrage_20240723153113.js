const { connect, disconnect, client } = require('./client')
const wallet = require('./wallet')
const { getOrderBook, submitTransaction } = require('./utils')
const axios = require('axios')
const { moaiApiUrl } = require('../config/settings')

async function getMoaiPrice(pair) {
    const response = await axios.get(`${moaiApiUrl}/prices/${pair}`)
    return response.data.price
}

async function arbitrage() {
    await connect()

    const xrpToUsd = await getOrderBook({ currency: 'XRP' }, { currency: 'USD' })
    const moaiPrice = await getMoaiPrice('XRP_USD')

    const buyPrice = parseFloat(xrpToUsd[0].TakerPays) / parseFloat(xrpToUsd[0].TakerGets)
    const sellPrice = moaiPrice

    if (buyPrice < sellPrice) {
        console.log(`Arbitrage opportunity: Buy at ${buyPrice}, Sell at ${sellPrice}`)

        // XRPL에서 매수
        const buyTx = {
            TransactionType: 'OfferCreate',
            Account: wallet.address,
            TakerGets: xrpl.xrpToDrops('100'),
            TakerPays: { currency: 'USD', value: (100 * buyPrice).toString() }
        }
        await submitTransaction(wallet, buyTx)

        // Moai Finance에서 매도
        await axios.post(`${moaiApiUrl}/trade`, {
            pair: 'XRP_USD',
            amount: 100,
            price: sellPrice,
            type: 'sell'
        })

        console.log('Arbitrage executed successfully')
    } else {
        console.log('No arbitrage opportunity found')
    }

    await disconnect()
}

arbitrage()
