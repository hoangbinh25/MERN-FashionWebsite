import axios from "axios"
const API_URL = import.meta.env.VITE_API_URL_BACKEND;

export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data
}

export const register = async (firstName, lastName, email, password, confirmPassword) => {
    const response = await axios.post(`${API_URL}/auth/register`, { firstName, lastName, email, password, confirmPassword })
    return response.data
}