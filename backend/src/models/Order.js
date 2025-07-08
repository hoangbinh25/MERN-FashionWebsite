const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema({
    idUser: { type: Schema.Types.ObjectId, ref: 'User' },
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    address: { type: String, require: true },
    statusPayment: { type: String, require: true },
    statusOrder: { type: String, default: 'pending' },
    orderDetail: [{ type: Schema.Types.ObjectId, ref: 'OrderDetail' }],
    total: { type: Number, require: true },
}, {
    timestamps: true
})

const Order = mongoose.modal('Order', orderSchema);
module.exports = Order;