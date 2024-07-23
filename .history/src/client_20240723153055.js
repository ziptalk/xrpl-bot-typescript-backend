const xrpl = require('xrpl')
const { xrplServer } = require('../config/settings')

const client = new xrpl.Client(xrplServer)

async function connect() {
    await client.connect()
}

async function disconnect() {
    await client.disconnect()
}

module.exports = { client, connect, disconnect }
