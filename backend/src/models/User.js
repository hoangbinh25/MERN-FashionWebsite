const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    userName: { type: String, require: true },
    email: { type: String, require: true },
    address: { type: String, require: false },
    password: { type: String, require: true },
    confirmPassword: { type: String, require: true },
    phone: { type: String, require: true },
    role: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false }

}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema);

module.exports = User;
