const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new mongoose.Schema({
    nameProduct: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: [{ type: String, required: true }],
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },
    color: { type: String, required: true },
    isActive: { type: Boolean, default: true }

}, {
    timestamps: true
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product;
