const express = require('express');
const router = express.Router();
const AddressController = require('../controllers/AddressController');

router.get('/get/:addressId', AddressController.getAddressByUserId);
router.post('/create', AddressController.createAddress);
router.put('/update/:addressId', AddressController.updateAddress);

module.exports = router;
