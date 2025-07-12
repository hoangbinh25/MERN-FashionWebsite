const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
});

exports.sendMail = async ({ to, subject, text, html }) => {
    try {
        return await transporter.sendMail({ from: process.env.MAIL_USER, to, subject, text, html });
    } catch (err) {
        throw err;
    }
};
