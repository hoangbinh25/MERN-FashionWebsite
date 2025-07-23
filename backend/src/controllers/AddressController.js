const AddressService = require('../services/AddressService');

// [POST] /address/create
const createAddress = async (req, res) => {
  try {
    const data = req.body;
    const result = await AddressService.createAddress(data, data.idUser);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: 'Error', message: error.message || error });
  }
};

// [GET] /address/get/:idUser
const getAddressByIdUser = async (req, res) => {
  try {
    const { idUser } = req.params;    
    if (!idUser) {
      return res.status(400).json({ 
        status: 'Error', 
        message: 'User ID parameter is required' 
      });
    }
    
    const result = await AddressService.getAddressByUserId(idUser);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error in getAddressByIdUser:", error);
    res.status(500).json({ status: 'Error', message: error.message || error });
  }
};

// [PUT] /address/update/:addressId
const updateAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    console.log("Updating address with ID:", addressId);
    const data = req.body;
    const result = await AddressService.updateAddress(addressId, data);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: 'Error', message: error.message || error });
  }
};

module.exports = {
  createAddress,
  getAddressByIdUser,
  updateAddress,
};