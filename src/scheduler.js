// src/scheduler.js
const cron = require('node-cron');
const arbitrage = require('./arbitrage');

function scheduleArbitrage() {
    // 매 시간마다 arbitrage 함수 실행
    cron.schedule('0 * * * *', () => {
        console.log('Running arbitrage task...');
        arbitrage();
    });
}

module.exports = { scheduleArbitrage };
