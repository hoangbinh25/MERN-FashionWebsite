const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/getAllOrders", OrderController.getAllOrders);
router.post("/", OrderController.createOrder);
router.get("/", OrderController.getOrdersByUser);
router.get("/:id", OrderController.getOrderById);
router.put("/:id/status", OrderController.updateOrderStatus);

module.exports = router; 
