import axios from "axios"
const API_URL = import.meta.env.VITE_API_URL_BACKEND;

export const getCartByUser = async (idUser) => {
    const response = await axios.get(`${API_URL}/cart/${idUser}`);
    console.log("getCartByUser response:", response.data);
    return response.data;
}

export const addProductToCart = async (idUser, idProduct, quantity, price, size) => {
    const response = await axios.post(`${API_URL}/cart/addProduct`, {
        idUser,
        idProduct,
        quantity,
        price,
        size,
    });
    console.log("addProductToCart response:", response.data);
    return response.data;
}

export const deleteProductFromCart = async (idUser, idProduct) => {
    const response = await axios.delete(`${API_URL}/cart/deleteProduct`, {
        data: { idUser, idProduct }
    });
    console.log("deleteProductFromCart response:", response.data);
    return response.data;
}

export const updateQuantityInCart = async (idUser, idProduct, quantity) => {
    console.log("updateQuantityInCart called with:", { idUser, idProduct, quantity });
    const response = await axios.put(`${API_URL}/cart/updateQuantity`, {
        idUser,
        idProduct,
        quantity
    });
    console.log("updateQuantityInCart response:", response.data);
    return response.data;
}

export const deleteAllProductInCart = async (idUser) => {
    console.log("deleteAllProductInCart called with idUser:", idUser);
    const response = await axios.delete(`${API_URL}/cart/deleteAllProductInCart`, {
        data: { idUser }
    });
    console.log("deleteAllProductInCart response:", response.data);
    return response.data;
}
