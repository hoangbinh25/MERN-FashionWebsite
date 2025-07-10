const mongoose = require('mongoose');

const OTPSchema = new mongoose.Schema({
    email: String,
    otp: String,
    expiresAt: Date,
});

module.exports = mongoose.model('Otp', OTPSchema);
