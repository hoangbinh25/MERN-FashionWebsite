const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderDetailSchema = new mongoose.Schema({
    idUser: { type: Schema.Types.ObjectId, ref: 'User' },
    idProduct: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, require: true },
    price: { type: Number, require: true },
}, {
    timestamps: true
})

const Cart = mongoose.modal('Cart', cartSchema);
module.exports = Cart;