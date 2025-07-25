const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    address: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Address" 
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: function () {
            return !this.googleId;
        },
    },
    phone: {
        type: String
    },
    role: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    googleId: {
        type: String
    },
    provider: {
        type: String,
        enum: ['local', 'google'],
        default: 'local'
    }

}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema);

module.exports = User;
