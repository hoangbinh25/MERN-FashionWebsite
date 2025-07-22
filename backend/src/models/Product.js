const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const variationSchema = new mongoose.Schema({
    size: { type: String, required: true },
    quantity: { type: Number, required: true },
});

const productSchema = new mongoose.Schema({
    nameProduct: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: [{ type: String, required: true }],
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    price: { type: Number, required: true },
    variations: [variationSchema],
    isActive: { type: Boolean, default: true }

}, {
    timestamps: true
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product;
