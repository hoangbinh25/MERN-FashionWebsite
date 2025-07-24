const cartService = require('../services/CartService');

// [GET] /cart/:idUser
const getCartByUser = async (req, res) => {
    const idUser = req.params.idUser;
    if (!idUser) {
        return res.status(400).json({ message: 'User ID is required' });
    }
    try {
        const cartItems = await cartService.getProductCartByUser(idUser);
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// [POST] /cart/addProduct
const addProductToCart = async (req, res) => {
    const { idUser, idProduct, quantity, price, size } = req.body;
    const missingFields = [];
    if (idUser == null) missingFields.push("idUser");
    if (idProduct == null) missingFields.push("idProduct");
    if (quantity == null) missingFields.push("quantity");
    if (price == null) missingFields.push("price");
    if (!size) missingFields.push("size");

    if (missingFields.length > 0) {
        return res.status(400).json({ message: `Missing or null fields: ${missingFields.join(", ")}` });
    }
    try {
        const newCart = await cartService.addPrdToCart(idUser, idProduct, quantity, price, size);
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// [DELETE] /cart/deleteProduct
const deleteProductFromCart = async (req, res) => {
    const { idUser, idProduct } = req.body;
    if (!idUser || !idProduct) {
        return res.status(400).json({ message: 'User ID and Product ID are required' });
    }
    try {
        const result = await cartService.deleteProductFromCart(idUser, idProduct);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// [PUT] /cart/updateQuantity
const updateQuantityInCart = async (req, res) => {
    const { idUser, idProduct, quantity } = req.body;
    if (!idUser || !idProduct || !quantity) {
        return res.status(400).json({ message: 'User ID, Product ID, and Quantity are required' });
    }
    try {
        const updatedCart = await cartService.updateQuantityProductInCart(idUser, idProduct, quantity);
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteAllProductInCart = async (req, res) => {
    const { idUser } = req.body;
    if (!idUser) {
        return res.status(400).json({ message: 'User ID is required' });
    }
    try {
        const result = await cartService.deleteAllProductInCart(idUser);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getCartByUser,
    addProductToCart,
    deleteProductFromCart,
    updateQuantityInCart,
    deleteAllProductInCart
};
