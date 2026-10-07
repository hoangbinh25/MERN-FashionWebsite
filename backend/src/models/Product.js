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

productSchema.index({ isActive: 1, createdAt: -1 });
productSchema.index({ isActive: 1, category: 1, createdAt: -1 });

const Product = mongoose.model('Product', productSchema)

module.exports = Product;
