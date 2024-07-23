const { XummSdk } = require('xumm-sdk');
const { API_KEY, API_SECRET } = require('../config/settings');

const Sdk = new XummSdk(API_KEY, API_SECRET);

async function getWallet() {
    try {
        const auth = await Sdk.authorize();
        console.log('User authorized:', auth);
        return auth;
    } catch (error) {
        console.error('Error authorizing user:', error);
        throw error;
    }
}

module.exports = { getWallet, Sdk };
