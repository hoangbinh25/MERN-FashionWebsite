import axios from "axios";
import api from "./authService.";
const API_URL = import.meta.env.VITE_API_URL_BACKEND;

export const updateUserProfile = async (userId, data) => {
    const res = await api.put(`${API_URL}/user/profile/${userId}`, data);
    return res.data
};