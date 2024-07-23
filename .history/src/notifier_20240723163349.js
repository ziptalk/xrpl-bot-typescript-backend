// src/notifier.js
const nodemailer = require('nodemailer');
const { NOTIFY_EMAIL, EMAIL_PASSWORD } = require('../config/settings');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: NOTIFY_EMAIL,
        pass: EMAIL_PASSWORD
    }
});

async function sendNotification(message) {
    const mailOptions = {
        from: NOTIFY_EMAIL,
        to: NOTIFY_EMAIL,
        subject: 'Notification from XRPL Bot',
        text: message
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Notification sent:', message);
    } catch (error) {
        console.error('Error sending notification:', error);
    }
}

module.exports = { sendNotification };
