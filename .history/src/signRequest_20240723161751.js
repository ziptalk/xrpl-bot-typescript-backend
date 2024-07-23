// src/signRequest.js
const { Sdk } = require('./wallet');

async function createSignRequest(transaction) {
    try {
        const payload = {
            options: {
                submit: true,
                expire: 5
            },
            txjson: transaction
        };
        
        const request = await Sdk.payload.create(payload);
        console.log('Sign request created:', request);
        return request;
    } catch (error) {
        console.error('Error creating sign request:', error);
        throw error;
    }
}

module.exports = { createSignRequest };
