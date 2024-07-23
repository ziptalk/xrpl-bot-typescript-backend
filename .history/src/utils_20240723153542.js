const { client } = require('./client')

async function getOrderBook(takerGets, takerPays) {
    const orderBook = await client.request({
        command: 'book_offers',
        taker_gets: takerGets,
        taker_pays: takerPays
    })
    return orderBook.result.offers
}

async function submitTransaction(wallet, tx) {
    const prepared = await client.autofill(tx)
    const signed = wallet.sign(prepared)
    return await client.submitAndWait(signed.tx_blob)
}

module.exports = { getOrderBook, submitTransaction }
