const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderDetailSchema = new mongoose.Schema({
    idUser: { type: Schema.Types.ObjectId, ref: 'User' },
    idProduct: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
}, {
    timestamps: true
})

const Cart = mongoose.modal('Cart', cartSchema);
module.exports = Cart;