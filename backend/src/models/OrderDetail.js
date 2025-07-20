const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderDetailSchema = new mongoose.Schema({
    Order: { type: Schema.Types.ObjectId, ref: 'Order' },
    Product: { type: Schema.Types.ObjectId, ref: 'Product' },
    User: { type: Schema.Types.ObjectId, ref: 'User' },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
}, {
    timestamps: true
})

const OrderDetail = mongoose.model('OrderDetail', orderDetailSchema);
module.exports = OrderDetail;