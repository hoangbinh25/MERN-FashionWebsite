import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL_BACKEND;

// Create a new order
export const createOrder = async (orderData) => {
  try {
    console.log("Creating order with data:", orderData);
    const res = await axios.post(`${API_URL}/order`, orderData);
    console.log("Create order response:", res.data);
    return res.data;
  } catch (error) {
    console.log("Create order error:", error);
    throw error;
  }
};

// Get all orders of a user
export const getOrdersByUser = async (idUser) => {
  try {
    const res = await axios.get(`${API_URL}/order?idUser=${idUser}`);
    return res.data;
  } catch (error) {
    console.log("Get orders by user error:", error);
    throw error;
  }
};

// Get order by id
export const getOrderById = async (orderId) => {
  try {
    const res = await axios.get(`${API_URL}/order/${orderId}`);
    return res.data;
  } catch (error) {
    console.log("Get order by id error:", error);
    throw error;
  }
};

// Update order status
export const updateOrderStatus = async (orderId, statusOrder) => {
  try {
    const res = await axios.put(`${API_URL}/order/${orderId}/status`, { statusOrder });
    return res.data;
  } catch (error) {
    console.log("Update order status error:", error);
    throw error;
  }
};
