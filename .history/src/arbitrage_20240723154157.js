const { connect, disconnect, client } = require('./client')
const wallet = require('./wallet')
const { getOrderBook, submitTransaction } = require('./utils')
const { assets, retryInterval, feeMultiplier } = require('../config/settings')
const { logArbitrageOpportunity, logTransaction } = require('./logger')
const { sendNotification } = require('./notifier')

async function checkArbitrage(asset1, asset2) {
    const orderBook1 = await getOrderBook(asset1, asset2)
    const orderBook2 = await getOrderBook(asset2, asset1)

    if (orderBook1.length > 0 && orderBook2.length > 0) {
        const buyPrice = parseFloat(orderBook1[0].TakerPays) / parseFloat(orderBook1[0].TakerGets)
        const sellPrice = parseFloat(orderBook2[0].TakerPays) / parseFloat(orderBook2[0].TakerGets)

        const effectiveBuyPrice = buyPrice * feeMultiplier

        if (effectiveBuyPrice < sellPrice) {
            const message = `Arbitrage opportunity: Buy ${asset1.currency} at ${buyPrice}, Sell at ${sellPrice}`
            console.log(message)
            logArbitrageOpportunity(message)

            const buyTx = {
                TransactionType: 'OfferCreate',
                Account: wallet.address,
                TakerGets: { currency: asset1.currency },
                TakerPays: { currency: asset2.currency, value: (100 * buyPrice).toString() }
            }
            await submitTransaction(wallet, buyTx)
            logTransaction('Buy', asset1.currency, buyPrice)

            const sellTx = {
                TransactionType: 'OfferCreate',
                Account: wallet.address,
                TakerGets: { currency: asset2.currency, value: (100 * sellPrice).toString() },
                TakerPays: { currency: asset1.currency }
            }
            await submitTransaction(wallet, sellTx)
            logTransaction('Sell', asset2.currency, sellPrice)

            console.log('Arbitrage executed successfully')
            sendNotification(message)
        }
    }
}

async function arbitrage() {
    await connect()

    try {
        for (let i = 0; i < assets.length; i++) {
            for (let j = i + 1; j < assets.length; j++) {
                await checkArbitrage(assets[i], assets[j])
            }
        }
    } catch (error) {
        console.error('Error during arbitrage process:', error)
    }

    await disconnect()

    // 재시도 설정
    setTimeout(arbitrage, retryInterval)
}

module.exports = arbitrage
