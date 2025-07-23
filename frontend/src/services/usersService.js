import axios from "axios";
import api from "./authService.";
const API_URL = import.meta.env.VITE_API_URL_BACKEND;

// getAllUsers
export const getAllUsers = async (params = {}) => {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            window.location.href = '/auth/login';
            return;
        }
        // Thêm searchName vào params nếu có
        const { page, limit, sortBy, role, isActive, searchName } = params;
        const queryParams = {
            page,
            limit,
            sortBy,
            role,
            isActive,
        };
        if (searchName && searchName.trim() !== "") {
            queryParams.searchName = searchName;
        }
        const res = await api.get(`${API_URL}/user/getUsers`, {
            params: queryParams,
            headers: {
                token: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        console.error('getAllUsers error:', error);
        throw error;
    }
};

// getUserById
export const getUserById = async (userId) => {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            window.location.href = '/auth/login';
            return;
        }
        const res = await axios.get(`${API_URL}/user/getUser/${userId}`, {
            headers: {
                token: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        console.error('getUserById error:', error);
        throw error;
    }
};

// createUser
export const createUser = async (data) => {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            window.location.href = '/auth/login';
            return;
        }
        const res = await api.post(`${API_URL}/user/create`, data, {
            headers: {
                token: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        console.error('createUser error:', error);
        throw error;
    }
};

// updateUser
export const updateUser = async (userId, data) => {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            window.location.href = '/auth/login';
            return;
        }
        const res = await axios.put(`${API_URL}/user/profile/${userId}`, data, {
            headers: {
                token: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        console.error('updateUser error:', error);
        throw error;
    }
};

// deleteUser
export const deleteUser = async (userId) => {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            window.location.href = '/auth/login';
            return;
        }
        const res = await api.delete(`${API_URL}/user/delete/${userId}`, {
            headers: {
                token: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        console.error('deleteUser error:', error);
        throw error;
    }
};

export const updateUserProfile = async (userId, data) => {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            window.location.href = '/auth/login';
            return;
        }
        const res = await api.put(`${API_URL}/user/profile/${userId}`, data, {
            headers: {
                token: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        console.error('updateUserProfile error:', error);
        throw error;
    }
};

export const sendContactMail = async (email, message) => {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            window.location.href = '/auth/login';
            return;
        }
        const res = await axios.post(`${API_URL}/contact/send-mail`,
            {
                email, message
            },
            {
                headers: {
                    token: `Bearer ${token}`
                }
            });
        return res.data;
    } catch (error) {
        console.error('sendContactMail error:', error);
        throw error;
    }
};
