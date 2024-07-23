const xrpl = require('xrpl')
const { testnetServer, mainnetServer, environment } = require('../config/settings')

const server = environment === 'mainnet' ? mainnetServer : testnetServer
const client = new xrpl.Client(server)

async function connect() {
    if (!client.isConnected()) {
        await client.connect()
    }
}

async function disconnect() {
    if (client.isConnected()) {
        await client.disconnect()
    }
}

module.exports = { client, connect, disconnect }
