const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new mongoose.Schema({
    idUser: { type: String, required: true, default: '' },
    fullName: { type: String, required: true, default: '' },
    phone: { type: String, required: true, default: '' },
    province: { type: String, required: true, default: '' },
    provinceCode: { type: Number, required: true, default: 0 },
    district: { type: String, required: true, default: '' },
    districtCode: { type: Number, required: true, default: 0 },
    commune: { type: String, required: true, default: '' },
    communeCode: { type: Number, required: true, default: 0 },
    addressDetail: { type: String, required: true, default: '' },
}, {
    timestamps: true
});

const Address = mongoose.model('Address', addressSchema);
module.exports = Address;