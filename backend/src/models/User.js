const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String },
    password: { type: String, required: true },
    phone: { type: String },
    role: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false }

}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema);

module.exports = User;
