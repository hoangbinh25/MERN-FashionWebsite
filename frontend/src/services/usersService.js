import axios from "axios";
import api from "./authService.";
const API_URL = import.meta.env.VITE_API_URL_BACKEND;

export const updateUserProfile = async (userId, data) => {
    const res = await api.put(`${API_URL}/user/profile/${userId}`, data);
    return res.data
};

export const sendContactMail = async (email, message) => {
    const token = localStorage.getItem('access_token');
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
};