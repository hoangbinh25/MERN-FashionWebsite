const express = require('express');
const router = express.Router();
const AddressController = require('../controllers/AddressController');

router.get('/get/:idUser', AddressController.getAddressByIdUser);
router.post('/create', AddressController.createAddress);
router.put('/update/:addressId', AddressController.updateAddress);

module.exports = router;
