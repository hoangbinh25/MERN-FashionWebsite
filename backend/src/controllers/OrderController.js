const OrderService = require('../services/OrderService');

const OrderController = {
  // Create a new order
  async createOrder(req, res) {
    try {
      const { idUser, address, statusPayment, orderDetails, total } = req.body;
      const missingFields = [];
      if (!idUser) missingFields.push("idUser");
      if (!address) missingFields.push("address");
      if (!statusPayment) missingFields.push("statusPayment");
      if (!orderDetails || !Array.isArray(orderDetails) || orderDetails.length === 0) missingFields.push("orderDetails");
      if (total == null) missingFields.push("total");

      if (missingFields.length > 0) {
        return res.status(400).json({
          error: "Missing required fields",
          missingFields
        });
      }

      const order = await OrderService.createOrder(req.body);
      res.status(201).json(order);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Get all orders of a user
  async getOrdersByUser(req, res) {
    try {
      const { idUser } = req.query;
      if (!idUser) {
        return res.status(400).json({
          error: "Missing required field",
          missingFields: ["idUser"]
        });
      }
      const orders = await OrderService.getOrdersByUser(idUser);
      res.json(orders);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Get order by id
  async getOrderById(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          error: "Missing required field",
          missingFields: ["id"]
        });
      }
      const order = await OrderService.getOrderById(id);
      res.json(order);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Update order status
  async updateOrderStatus(req, res) {
    try {
      const { id } = req.params;
      const { statusOrder } = req.body;
      const missingFields = [];
      if (!id) missingFields.push("id");
      if (!statusOrder) missingFields.push("statusOrder");
      if (missingFields.length > 0) {
        return res.status(400).json({
          error: "Missing required fields",
          missingFields
        });
      }
      const updatedOrder = await OrderService.updateOrderStatus(id, statusOrder);
      res.json(updatedOrder);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Get all orders (admin)
  async getAllOrders(req, res) {
    try {
      const orders = await OrderService.getAllOrders();
      res.json(orders);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};

module.exports = OrderController;