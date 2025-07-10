const mongoose = require('mongoose');

const OTPSchema = new mongoose.Schema({
    email: String,
    otp: String,
    expiresAt: {
        type: Date,
        index: { expires: 0 },
    },
});

module.exports = mongoose.model('Otp', OTPSchema);
