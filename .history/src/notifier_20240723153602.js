const nodemailer = require('nodemailer')
const { notifyEmail } = require('../config/settings')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password'
    }
})

function sendNotification(message) {
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: notifyEmail,
        subject: 'Arbitrage Opportunity Detected',
        text: message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error)
        }
        console.log('Email sent: ' + info.response)
    })
}

module.exports = { sendNotification }
