import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL_BACKEND;

const getAllProducts = async ({
    page = 0,
    limit = 5, 
    sort = "nameproduct",
    order = "desc",
    nameProduct,
    color,
    size,
    category,
    minPrice,
    maxPrice
}) => {
    const datatest = `${API_URL}/product/getProducts`+'?page=' + page + '&limit=' + limit + '&sort=' + sort + '&order=' + order + '&nameProduct=' + nameProduct + '&color=' + color + '&size=' + size + '&category=' + category + '&minPrice=' + minPrice + '&maxPrice=' + maxPrice;
    console.log("API URL:", datatest);
    const response = await axios.get(`${API_URL}/product/getProducts`, {
        params: { page, limit, sort, order, nameProduct, color, size, minPrice, maxPrice }
    });

    return response.data;
};

const getProductById = async (id) => {
    const response = await axios.get(`${API_URL}/product/getproduct/${id}`);
    return response.data;
}

const createProduct = async (data) => {
    const response = await axios.post(`${API_URL}/product/create`, data);
    return response.data;
}   

const updateProduct = async (id, data) => {
    const response = await axios.put(`${API_URL}/product/update/${id}`, data);
    return response.data;
}   
const deleteProduct = async (id) => {
    const response = await axios.delete(`${API_URL}/product/delete/${id}`);
    return response.data;
}

export {
    getAllProducts, 
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};

