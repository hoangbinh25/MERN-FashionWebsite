const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storeSchema = new mongoose.Schema({
    idProduct: { type: Schema.Types.ObjectId, ref: 'Product' },
    idCategory: { type: Schema.Types.ObjectId, ref: 'Category' },
    importPrice: { type: Number, require: true },
    exportPrice: { type: Number, require: true },
}, {
    timestamps: true
})

const Store = mongoose.modal('Store', storeSchema);
module.exports = Store;