const mongoose = require('mongoose')

const catSchema = new mongoose.Schema({
    nameCategory: { type: String, require: true }
}, {
    timestamps: true
})

const Category = mongoose.model('Category', catSchema);

module.exports = Category;

