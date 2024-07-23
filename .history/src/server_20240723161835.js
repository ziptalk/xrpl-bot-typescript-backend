const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../public')))

// 프론트엔드에서 자산 추가
app.post('/api/add-assets', (req, res) => {
    const { assets } = req.body
    // 추가 자산 로직
    res.status(200).send({ message: 'Assets added successfully' })
})

// 프론트엔드에서 출금 요청
app.post('/api/withdraw', (req, res) => {
    const { amount, address } = req.body
    // 출금 로직
    res.status(200).send({ message: 'Withdrawal initiated successfully' })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
