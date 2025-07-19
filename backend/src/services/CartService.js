const Cart = require('../models/Cart');
const mongoose = require('mongoose'); 

const addPrdToCart = async (idUser, idProduct, quantity, price) => {
    return new Promise(async (resolve, reject) => {
        try {
            const cartItem = await Cart.findOne({ idUser: idUser, idProduct: idProduct });
            if (cartItem) {
                cartItem.quantity += quantity;
                await cartItem.save();
                return resolve(cartItem);
            }
            const newCart = new Cart({
                idUser: idUser,
                idProduct: idProduct,
                quantity: quantity,
                price: price
            });
            await newCart.save();
            resolve(newCart);
        } catch (error) {
            reject(error);
        }
    });
}

const getProductCartByUser = async (idUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            const cartItems = await Cart.find({ idUser: idUser }).populate('idProduct');
            resolve(cartItems);
        } catch (error) {
            reject(error);
        }
    });
}

const deleteProductFromCart = async (idUser, idProduct) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkCart = await Cart.findOne({
                idUser: new mongoose.Types.ObjectId(idUser),
                idProduct: new mongoose.Types.ObjectId(idProduct)  
            })

            if (!checkCart) {
                return resolve({
                    status: 'Error',
                    message: 'The product is not in the cart'
                })
            }

            await Cart.findByIdAndDelete(checkCart._id)
            resolve({
                status: 'OK',
                message: 'Delete product from cart success'
            })
        }catch (error) {
            reject(error);
        }
    })
}

const updateQuantityProductInCart = async (idUser, idProduct, quantity) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(`Updating quantity for User: ${idUser}, Product: ${idProduct}, Quantity: ${quantity}`);
            const cartItem = await Cart.findOne({
                idUser: new mongoose.Types.ObjectId(idUser),
                idProduct: new mongoose.Types.ObjectId(idProduct)   
            });
            console.log("cartItem:", cartItem);
            if (cartItem) {
                cartItem.quantity = quantity;
                await cartItem.save();
                resolve(cartItem);
            } else {
                reject(new Error('Cart item not found'));
            }
        } catch (error) {
            console.error('Error updating quantity in cart:', error);
            reject(error);
        }
    });
};

module.exports = {
    addPrdToCart,
    getProductCartByUser,
    deleteProductFromCart,
    updateQuantityProductInCart
};