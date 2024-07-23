const { connect, disconnect } = require('./src/client')
const arbitrage = require('./src/arbitrage')
const { createAMM, depositToAMM, withdrawFromAMM } = require('./src/amm')
const { assets } = require('./config/settings')

async function test() {
  await connect()

  try {
    // AMM 생성 테스트
    const ammResult = await createAMM(assets[0], assets[1], 10)
    console.log('AMM created:', ammResult)

    // 유동성 추가 테스트
    const depositResult = await depositToAMM(ammResult.Account, assets[0], { currency: 'XRP', value: '1000' })
    console.log('Deposit to AMM:', depositResult)

    // 유동성 제거 테스트
    const withdrawResult = await withdrawFromAMM(ammResult.Account, assets[0], { currency: 'XRP', value: '500' })
    console.log('Withdraw from AMM:', withdrawResult)

    // 아비트리지 로직 테스트
    await arbitrage()
  } catch (error) {
    console.error('Test error:', error)
  }

  await disconnect()
}

test()
