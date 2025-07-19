const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');

const OrderService = {
  // Create a new order
  async createOrder({ idUser, address, statusPayment, orderDetails, total }) {
    try {
      if (!Array.isArray(orderDetails) || orderDetails.length === 0) {
        throw new Error("orderDetails must be a non-empty array");
      }

      // Bước 1: Tạo Order trước (chưa có orderDetail)
      const order = new Order({
        idUser,
        address,
        statusPayment,
        orderDetail: [],
        total,
      });
      await order.save();

      // Bước 2: Tạo các OrderDetail, gán idOrder cho từng cái
      const orderDetailIds = [];
      for (const detail of orderDetails) {
        const orderDetailDoc = new OrderDetail({
          Order: order._id,
          Product: detail.idProduct,
          User: idUser,
          quantity: detail.quantity,
          price: detail.price,
        });
        await orderDetailDoc.save();
        orderDetailIds.push(orderDetailDoc._id);
      }

      // Bước 3: Cập nhật lại mảng orderDetail trong Order
      order.orderDetail = orderDetailIds;
      await order.save();

      return order;
    } catch (error) {
      throw error;
    }
  },

  // Get all orders of a user
async getOrdersByUser(idUser) {
  try {
    return await Order.find({ idUser })
      .populate({
        path: 'orderDetail',
        populate: { path: 'Product', model: 'Product' }
      });
  } catch (error) {
    throw error;
  }
},

  // Get order by id
  async getOrderById(orderId) {
    try {
      return await Order.findById(orderId).populate({
        path: 'orderDetail',
        populate: { path: 'Product', model: 'Product' }
      });
    } catch (error) {
      throw error;
    }
  },

  // Update order status
  async updateOrderStatus(orderId, statusOrder) {
    try {
      return await Order.findByIdAndUpdate(orderId, { statusOrder }, { new: true });
    } catch (error) {
      throw error;
    }
  },

  // Get all orders (admin)
  async getAllOrders() {
    try {
      return await Order.find().populate({
        path: 'orderDetail',
        populate: { path: 'Product', model: 'Product' }
      });
    } catch (error) {
      throw error;
    }
  }
};

module.exports = OrderService;