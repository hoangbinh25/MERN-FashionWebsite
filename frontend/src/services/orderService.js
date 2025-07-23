import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL_BACKEND;

export const getAllTransactions = async () => {
  try {
    const res = await axios.get(`${API_URL}/transaction/proxy`);
    console.log("Get all transactions response:", res.data);
    return res.data;
  } catch (error) {
    console.log("Get all transactions error:", error);
    throw error;
  }
};

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

// Get all orders (admin) with filters and sorting
export const getAllOrders = async ({ status, sortBy }) => {
  try {
    const params = {};
    if (status) params.status = status;
    if (sortBy) params.sortBy = sortBy;

    const res = await axios.get(`${API_URL}/order/getAllOrders`, { params });
    return res.data;
  } catch (error) {
    console.log("Get all orders error:", error);
    throw error;
  }
};

export const createAddress = async (addressData) => {
  try {
    const res = await axios.put(`${API_URL}/user/create`, addressData);
    return res.data;
  } catch (error) {
    console.error("Create address error:", error);
    throw error;
  }
};

export const getAddressByIdUser = async (idUser) => {
  try {
    const res = await axios.get(`${API_URL}/address/get/${idUser}`);
    return res.data;
  } catch (error) {
    // Nếu không tìm thấy địa chỉ, trả về null thay vì throw error
    if (error.response && error.response.status === 404) {
      return null;
    }
    console.error("Get address by address ID error:", error);
    throw error;
  }
};

export const updateAddress = async (addressId, addressData) => {
  try {
    const res = await axios.put(`${API_URL}/address/update/${addressId}`, addressData);
    return res.data;
  } catch (error) {
    console.error("Update address error:", error);
    throw error;
  }
};


