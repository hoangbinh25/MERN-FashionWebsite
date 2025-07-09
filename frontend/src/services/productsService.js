import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL_BACKEND;

const getAllProducts = async ({
    page = 1,
    limit = 5, 
    sort = "nameproduct",
    order = "desc",
    nameProduct,
    product,
    color,
    size,
    minPrice,
    maxPrice
}) => {
    const datatest = `${API_URL}/product/getProducts`+'?page=' + page + '&limit=' + limit + '&sort=' + sort + '&order=' + order + '&nameProduct=' + nameProduct + '&product=' + product + '&color=' + color + '&size=' + size + '&minPrice=' + minPrice + '&maxPrice=' + maxPrice;
    console.log("API URL:", datatest);
    const response = await axios.get(`${API_URL}/product/getProducts`, {
        params: { page, limit, sort, order, nameProduct, product, color, size, minPrice, maxPrice }
    });
    console.log("Response data:", response.data.productName);
    console.log("Response status:", response.status);
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
    getAllProducts
};

