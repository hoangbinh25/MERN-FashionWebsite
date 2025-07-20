const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema({
    idUser: { type: Schema.Types.ObjectId, ref: 'User' },
    address: { type: String, required: true },
    fullName: { type: String, required: true },
    phone: { type: Number, required: true },
    statusPayment: { type: String, required: true, default: 'cod' },
    statusOrder: { type: String, default: 'pending' },
    orderDetail: [{ type: Schema.Types.ObjectId, ref: 'OrderDetail' }],
    total: { type: Number, required: true },
}, {
    timestamps: true
})

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;