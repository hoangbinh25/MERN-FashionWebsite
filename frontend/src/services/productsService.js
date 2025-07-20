import api from "./authService.";

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
    const datatest = `${API_URL}/product/getProducts` + '?page=' + page + '&limit=' + limit + '&sort=' + sort + '&order=' + order + '&nameProduct=' + nameProduct + '&color=' + color + '&size=' + size + '&category=' + category + '&minPrice=' + minPrice + '&maxPrice=' + maxPrice;
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
    // Nếu data là FormData (có ảnh), gửi multipart/form-data
    let config = {};
    let payload = data;
    if (data instanceof FormData) {
        config.headers = { 'Content-Type': 'multipart/form-data' };
    }
    try {
        const response = await api.post(`${API_URL}/product/create`, payload, config);
        return response.data;
    } catch (error) {
        console.log('createProduct error:', error);
        throw error;
    }
}

const updateProduct = async (id, data) => {
    // Nếu data là FormData (có ảnh), gửi multipart/form-data
    let config = {};
    let payload = data;
    if (data instanceof FormData) {
        config.headers = { 'Content-Type': 'multipart/form-data' };
    }
    try {
        const response = await api.put(`${API_URL}/product/update/${id}`, payload, config);
        return response.data;
    } catch (error) {
        console.log('updateProduct error:', error);
        throw error;
    }
}

const updateProductIsActive = async (id, isActive) => {
    try {
        const response = await api.put(`${API_URL}/product/update-isActive/${id}`, { isActive });
        return response.data;
    } catch (error) {
        console.error('updateProductIsActive error:', error);
        throw error;
    }
}

const deleteProduct = async (id) => {
    const response = await api.delete(`${API_URL}/product/delete/${id}`);
    return response.data;
}

export {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    updateProductIsActive
};

