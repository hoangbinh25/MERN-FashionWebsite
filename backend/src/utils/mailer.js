const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
});

// Gửi OTP
exports.sendMail = async ({ to, subject, text }) =>
    await transporter.sendMail({
        from: `"TBN Store" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text
    });