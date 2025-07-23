const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');

const OrderService = {
  // Create a new order
  async createOrder({ idUser, address, fullName, phone, statusPayment, orderDetails, total }) {
    try {
      if (!Array.isArray(orderDetails) || orderDetails.length === 0) {
        throw new Error("orderDetails must be a non-empty array");
      }

      // Bước 1: Tạo Order trước (chưa có orderDetail)
      const order = new Order({
        idUser,
        address,
        fullName,
        phone,
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
      .sort({ createdAt: -1 })
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


  // Get all orders (admin) with filters and sorting
  async getAllOrders({ status, sortBy } = {}) {
    try {
      // Convert params to lowercase
      const statusLower = status ? status.toLowerCase() : "all";
      const sortByLower = sortBy ? sortBy.toLowerCase() : "date-desc";

      // Build filter object
      const filter = {};
      if (statusLower && statusLower !== "all") {
        filter.statusOrder = { $regex: new RegExp(`^${statusLower}$`, "i") }; // case-insensitive match
      }

      // Build sort object
      let sort = {};
      switch (sortByLower) {
        case "date-desc":
          sort = { createdAt: -1 };
          break;
        case "date-asc":
          sort = { createdAt: 1 };
          break;
        case "total-desc":
          sort = { total: -1 };
          break;
        case "total-asc":
          sort = { total: 1 };
          break;
        default:
          sort = { createdAt: -1 };
      }

      return await Order.find(filter)
        .sort(sort)
        .populate({
          path: 'orderDetail',
          populate: { path: 'Product', model: 'Product' },
        });
    } catch (error) {
      throw error;
    }
  }
};

module.exports = OrderService;