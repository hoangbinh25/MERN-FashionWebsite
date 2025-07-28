const mongoose = require('mongoose')

const catSchema = new mongoose.Schema({
    nameCategory: { type: String, required: true },
    normalizedName: {
        type: String,
        required: true,
        index: true,
    },
}, {
    timestamps: true
})

const Category = mongoose.model('Category', catSchema);

module.exports = Category;

