import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL_BACKEND;

export const chatbot = async (message) => {
    const res = await axios.post(`${API_URL}/chat/ask`, { message });
    return res.data;
}