const { connect, disconnect, client } = require('./client')
const wallet = require('./wallet')
const { getOrderBook, submitTransaction } = require('./utils')
const { createAMM, bidAuctionSlot, depositToAMM, withdrawFromAMM } = require('./amm')
const { assets, retryInterval, feeMultiplier, maxLoss, minProfit, minSlotPrice, useAMM } = require('../config/settings')
const { logArbitrageOpportunity, logTransaction } = require('./logger')
const { sendNotification } = require('./notifier')

async function checkArbitrage(asset1, asset2) {
    const orderBook1 = await getOrderBook(asset1, asset2)
    const orderBook2 = await getOrderBook(asset2, asset1)

    if (orderBook1.length > 0 && orderBook2.length > 0) {
        const buyPrice = parseFloat(orderBook1[0].TakerPays) / parseFloat(orderBook1[0].TakerGets)
        const sellPrice = parseFloat(orderBook2[0].TakerPays) / parseFloat(orderBook2[0].TakerGets)

        const effectiveBuyPrice = buyPrice * feeMultiplier
        const potentialProfit = sellPrice - effectiveBuyPrice

        if (potentialProfit >= minProfit) {
            const message = `Arbitrage opportunity: Buy ${asset1.currency} at ${buyPrice}, Sell at ${sellPrice}`
            console.log(message)
            logArbitrageOpportunity(message)

            const buyTx = {
                TransactionType: 'OfferCreate',
                Account: wallet.address,
                TakerGets: { currency: asset1.currency },
                TakerPays: { currency: asset2.currency, value: (100 * buyPrice).toString() }
            }
            const buyResult = await submitTransaction(wallet, buyTx)
            logTransaction('Buy', asset1.currency, buyPrice)

            const sellTx = {
                TransactionType: 'OfferCreate',
                Account: wallet.address,
                TakerGets: { currency: asset2.currency, value: (100 * sellPrice).toString() },
                TakerPays: { currency: asset1.currency }
            }
            const sellResult = await submitTransaction(wallet, sellTx)
            logTransaction('Sell', asset2.currency, sellPrice)

            if (buyResult && sellResult) {
                console.log('Arbitrage executed successfully')
                sendNotification(message)
            } else {
                console.error('Transaction failed, checking for losses')
                // Implement loss management logic
            }
        } else {
            console.log('Arbitrage opportunity not profitable enough')
        }
    }
}

async function arbitrage() {
    await connect()

    try {
        if (useAMM) {
            // AMM 인스턴스 생성 및 유동성 추가
            const ammResult = await createAMM(assets[0], assets[1], 10) // Example values
            console.log('AMM created:', ammResult)

            // 경매 슬롯 입찰
            const bidResult = await bidAuctionSlot(ammResult.Account, 100, minSlotPrice) // Example values
            console.log('Auction slot bid result:', bidResult)

            // AMM을 통한 거래 처리 로직 추가 가능
        } else {
            for (let i = 0; i < assets.length; i++) {
                for (let j = i + 1; j < assets.length; j++) {
                    await checkArbitrage(assets[i], assets[j])
                }
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
