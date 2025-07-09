import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL_BACKEND;

const getAllCategory = async ({
    page = 1,
    limit = 5, 
    sort = "nameCategory",
    order = "desc",
    search = ""
}) => {
    const datatest = `${API_URL}/category/getCategories`;
    console.log("getAllCategory datatest: ", datatest);
    const response = await axios.get(`${API_URL}/category/getCategories`, {
        params: { page, limit, sort, order, search }
    });
    console.log("getAllCategory response: ", response.data);
    return response.data;
};

const getCategoryById = async (id) => {
    const response = await axios.get(`${API_URL}/category/getCategory/${id}`);
    return response.data;
}

const createCategory = async (data) => {
    const response = await axios.post(`${API_URL}/category/create`, data);
    return response.data;
}   

const updateCategory = async (id, data) => {
    const response = await axios.put(`${API_URL}/category/update/${id}`, data);
    return response.data;
}   
const deleteCategory = async (id) => {
    const response = await axios.delete(`${API_URL}/category/delete/${id}`);
    return response.data;
}

export {
    getAllCategory,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};

