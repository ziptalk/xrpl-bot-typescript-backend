// src/frontend.js
const express = require('express');
const { createSignRequest } = require('./signRequest');

const router = express.Router();

router.post('/send-sign-request', async (req, res) => {
    try {
        const transaction = req.body.transaction;
        const request = await createSignRequest(transaction);
        res.json({ qrCodeUrl: request.next.always });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
