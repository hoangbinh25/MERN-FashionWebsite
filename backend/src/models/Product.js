const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    nameProduct: { type: String, require: true, unique: true },
    description: { type: String, require: true },
    category: { type: String, require: true },
    quantity: { type: Number, require: true },
    price: { type: Number, require: true },
    size: { type: String, require: true },
    color: { type: String, require: true }

}, {
    timestamps: true
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product;
