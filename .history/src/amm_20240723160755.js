const xrpl = require('xrpl')
const { client } = require('./client')
const wallet = require('./wallet')

async function createAMM(asset1, asset2, tradingFee) {
    const transaction = {
        TransactionType: 'AMMCreate',
        Account: wallet.address,
        Amount: asset1,
        Amount2: asset2,
        TradingFee: tradingFee
    }
    const prepared = await client.autofill(transaction)
    const signed = wallet.sign(prepared)
    const result = await client.submitAndWait(signed.tx_blob)
    return result
}

async function bidAuctionSlot(ammAccount, bidAmount, minBidPrice) {
    const transaction = {
        TransactionType: 'AMMBid',
        Account: wallet.address,
        AMM: ammAccount,
        Amount: bidAmount,
        MinBidPrice: minBidPrice
    }
    const prepared = await client.autofill(transaction)
    const signed = wallet.sign(prepared)
    const result = await client.submitAndWait(signed.tx_blob)
    return result
}

async function depositToAMM(ammAccount, asset, amount) {
    const transaction = {
        TransactionType: 'AMMDeposit',
        Account: wallet.address,
        AMM: ammAccount,
        Amount: amount,
        Asset: asset
    }
    const prepared = await client.autofill(transaction)
    const signed = wallet.sign(prepared)
    const result = await client.submitAndWait(signed.tx_blob)
    return result
}

async function withdrawFromAMM(ammAccount, asset, amount) {
    const transaction = {
        TransactionType: 'AMMWithdraw',
        Account: wallet.address,
        AMM: ammAccount,
        Amount: amount,
        Asset: asset
    }
    const prepared = await client.autofill(transaction)
    const signed = wallet.sign(prepared)
    const result = await client.submitAndWait(signed.tx_blob)
    return result
}

module.exports = { createAMM, bidAuctionSlot, depositToAMM, withdrawFromAMM }
