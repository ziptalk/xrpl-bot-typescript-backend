// index.js

require('dotenv').config(); // 환경 변수 로드

const { scheduleArbitrage } = require('./src/scheduler');
const express = require('express');
const bodyParser = require('body-parser');
const frontend = require('./src/frontend');
// const { sendNotification } = require('./src/notifier');
const { createAMM, depositToAMM, withdrawFromAMM } = require('./src/amm');
const { assets } = require('./config/settings');

// Express 서버 설정
const app = express();
app.use(bodyParser.json());

// 프론트엔드 경로 설정
app.use('/api', frontend);

// AMM 관련 엔드포인트 예시
app.post('/api/create-amm', async (req, res) => {
    try {
        const { asset1, asset2, tradingFee } = req.body;
        const result = await createAMM(asset1, asset2, tradingFee);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/api/deposit-to-amm', async (req, res) => {
    try {
        const { ammAccount, asset, amount } = req.body;
        const result = await depositToAMM(ammAccount, asset, amount);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/api/withdraw-from-amm', async (req, res) => {
    try {
        const { ammAccount, asset, amount } = req.body;
        const result = await withdrawFromAMM(ammAccount, asset, amount);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// assets 초기화 로직 추가
function initializeAssets() {
    assets.forEach(asset => {
        console.log(`Initializing asset: ${asset.currency}${asset.issuer ? ` (Issuer: ${asset.issuer})` : ''}`);
        // 초기화 작업 추가
    });
}

// 서버 시작
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    // sendNotification(`Server started on port ${port}`);
    initializeAssets(); // assets 초기화
});

// 아비트리지 스케줄링
scheduleArbitrage();
