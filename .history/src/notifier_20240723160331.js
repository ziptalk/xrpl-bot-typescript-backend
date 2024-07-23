const nodemailer = require('nodemailer')
const { notifyEmail, emailPassword } = require('../config/settings')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: notifyEmail,
        pass: emailPassword
    }
})

function sendNotification(message) {
    const mailOptions = {
        from: notifyEmail,
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
