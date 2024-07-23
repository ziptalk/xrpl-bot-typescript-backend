const cron = require('node-cron')
const arbitrage = require('./arbitrage')

// 1분마다 아비트리지 로직 실행
cron.schedule('* * * * *', () => {
    arbitrage()
})
