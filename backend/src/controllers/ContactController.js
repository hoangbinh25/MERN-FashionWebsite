const User = require('../models/User');
const Feedback = require('../models/Feedback');
const { sendMail } = require('../utils/mailer');


const sendMailToAdmins = async (req, res) => {
    try {
        const { email, message } = req.body;
        if (!email || !message) {
            return res.status(400).json({ message: 'Email and message is required.' });
        }

        await Feedback.create({ email, message });

        const admins = await User.find({ role: true });
        const adminEmails = admins.map(user => user.email);

        if (adminEmails.length === 0) {
            return res.status(404).json({ message: 'Not found email.' });
        }
        await Promise.all(
            adminEmails.map(adminEmail =>
                sendMail({
                    to: adminEmail,
                    subject: 'Contact from website',
                    text: `From: ${email}\nMessage: ${message}`,
                    html: `
                        <h3> Feedback from customers</h3>
                        <p><strong>Email người gửi:</strong> ${email}</p>
                        <p><strong>Nội dung:</strong></p>
                        <div style="border-left: 4px solid #ccc; padding-left: 10px;">${message}</div>`
                })
            )
        );

        res.status(200).json({ message: 'Thanks for your feedback! We have received your information.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error when send feed.' });
    }
};

module.exports = {
    sendMailToAdmins
};
