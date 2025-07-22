import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL_BACKEND;


export const fetchReportData = async ({ filterType, year, month, quarter }) => {
  try {
    const params = { filterType, year, month, quarter };
    const response = await axios.get(`${API_URL}/report/reportAll`, { params });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch report data:", error);
    throw error;
  }
};