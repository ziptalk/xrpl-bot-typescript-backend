const { client } = require('./client')

async function getOrderBook(takerGets, takerPays) {
    try {
        const orderBook = await client.request({
            command: 'book_offers',
            taker_gets: takerGets,
            taker_pays: takerPays
        })
        return orderBook.result.offers
    } catch (error) {
        console.error('Error fetching order book:', error)
        return []
    }
}

async function submitTransaction(wallet, tx) {
    try {
        const prepared = await client.autofill(tx)
        const signed = wallet.sign(prepared)
        return await client.submitAndWait(signed.tx_blob)
    } catch (error) {
        console.error('Error submitting transaction:', error)
        return null
    }
}

module.exports = { getOrderBook, submitTransaction }
