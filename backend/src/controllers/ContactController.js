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
                        <div style="font-family: 'Segoe UI', 'Roboto', Arial, sans-serif; background: linear-gradient(90deg, #f3e7e9 0%, #e3eeff 100%); border-radius: 16px; box-shadow: 0 4px 16px rgba(0,0,0,0.07); padding: 32px; max-width: 500px; margin: 0 auto;">
                          <h2 style="color: #6C63FF; font-size: 2rem; margin-bottom: 12px; font-weight: 700; letter-spacing: 1px;">Customer Feedback 💬</h2>
                          <p style="font-size: 1rem; color: #333; margin-bottom: 18px;"><strong>Sender Email:</strong> <span style="color: #FF6584;">${email}</span></p>
                          <div style="background: #fff7fa; border-left: 5px solid #6C63FF; padding: 18px 16px; border-radius: 8px; margin-bottom: 10px;">
                            <p style="font-size: 1.1rem; color: #222; margin: 0 0 8px 0;"><strong>Message:</strong></p>
                            <div style="font-size: 1rem; color: #444;">${message}</div>
                          </div>
                          <div style="margin-top: 28px; text-align: center;">
                            <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(90deg, #6C63FF 0%, #FF6584 100%); color: #fff; font-weight: 600; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-size: 1.1rem; box-shadow: 0 2px 8px rgba(108,99,255,0.12); transition: background 0.3s;">Reply Quickly</a>
                            <p style="font-size: 0.95rem; color: #888; margin-top: 10px;">Click the button to reply directly to the sender.</p>
                          </div>
                          <p style="font-size: 0.95rem; color: #888; margin-top: 18px;">Thank you for supporting TBN Store! 🚀</p>
                        </div>
                    `
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
