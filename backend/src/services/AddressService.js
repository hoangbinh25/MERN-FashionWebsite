const Address = require('../models/Address'); 
const mongoose = require("mongoose");
const { updateAddress } = require('./UserService');

const AddressService = {
  async createAddress(data, idUser) {
    console.log('Creating address with data:', data, 'for user ID:', idUser);
    return new Promise(async (resolve, reject) => {
      try {
        const newAddress = new Address(data);
        const savedAddress = await newAddress.save();

        if(savedAddress){
            if(idUser){
                try {
                   const userData = await updateAddress(idUser, savedAddress);
                   resolve({
                        status: 'OK',
                        message: 'update Address created successfully',
                        userData: userData,
                    });
                } catch (error) {
                    reject({
                        message: "Failed to update user address",
                        error: error
                    });
                }
            }
        }

        resolve({
          status: 'OK',
          message: 'Address created successfully',
          data: savedAddress,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  async getAddressByUserId(idUser) {
    return new Promise(async (resolve, reject) => {
      try {
        const addresses = await Address.find({ idUser: idUser });
        resolve({
          status: 'OK',
          message: 'Addresses retrieved successfully',
          data: addresses,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  async updateAddress(addressId, data) {
    return new Promise(async (resolve, reject) => {
      try {
        const updatedAddress = await Address.findByIdAndUpdate(addressId, data, { new: true });
        if (!updatedAddress) {
          return reject({
            status: 'Error',
            message: 'Address not found',
          });
        }
        resolve({
          status: 'OK',
          message: 'Address updated successfully',
          data: updatedAddress,
        });
      } catch (error) {
        reject(error);
      }
    });
  }
};

module.exports = AddressService;
