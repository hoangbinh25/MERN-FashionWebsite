import axios from "axios";
import api from "./authService.";
const API_URL = import.meta.env.VITE_API_URL_BACKEND;

const getAllBlog = async ({
    page = 1,
    limit = 5,
    sort = 'title',
    order = 'desc',
    search = '',
    titleBlog,
}) => {
    const res = await api.get(`${API_URL}/blog/getBlogs`, {
        params: { page, limit, sort, order, search, titleBlog },
    })
    return res.data;
}

const getBlogById = async (id) => {
    const res = await api.get(`${API_URL}/blog/getBlog/${id}`);
    return res.data.data;
}

const createBlog = async (data) => {
    let config = {};
    let payload = data;
    if (data instanceof FormData) {
        config.headers = { 'Content-Type': 'multipart/form-data' };
    }
    try {
        const res = await api.post(`${API_URL}/blog/create`, payload, config);
        return res.data;
    } catch (error) {
        console.log('Create blog error: ', error)
        throw error
    }
}

const updateBlog = async (id, data) => {
    let config = {};
    let payload = data;
    if (data instanceof FormData) {
        config.headers = { 'Content-Type': 'multipart/form-data' };
    }
    try {
        const res = await api.put(`${API_URL}/blog/update/${id}`, payload, config);
        return res.data;
    } catch (error) {
        console.log('Create blog error: ', error)
        throw error
    }
}

const deleteBlog = async (id) => {
    const res = await api.delete(`${API_URL}/blog/delete/${id}`);
    return res.data;
}

export {
    getAllBlog,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog
};