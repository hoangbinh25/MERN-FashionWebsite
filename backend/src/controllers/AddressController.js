const AddressService = require('../services/AddressService');

// [POST] /address/create
const createAddress = async (req, res) => {
  try {
    const data = req.body;
    const userId = data.idUser; // Assuming userId is set in the request context
    const result = await AddressService.createAddress(data, data.idUser);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: 'Error', message: error.message || error });
  }
};

// [GET] /address/user/:userId
const getAddressByUserId = async (req, res) => {
  try {
    const { addressId } = req.params;
    const result = await AddressService.getAddressByUserId(addressId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: 'Error', message: error.message || error });
  }
};

// [PUT] /address/update/:addressId
const updateAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const data = req.body;
    const result = await AddressService.updateAddress(addressId, data);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: 'Error', message: error.message || error });
  }
};

module.exports = {
  createAddress,
  getAddressByUserId,
  updateAddress,
};