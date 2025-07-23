const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');
const Product = require('../models/Product'); // Thêm dòng này ở đầu file
const mongoose = require("mongoose");

const ReportService = {
  async getDashboardStats({ filterType, year, month, quarter }) {
    const matchStage = {};

    // Filter theo thời gian
    if (year) {
      // Bộ lọc đặc biệt: filterType === "day-{month}" hoặc "day-{month}-{date}"
      const exactDayMatch = /^day-(\d{1,2})-(\d{1,2})$/.exec(filterType);
      const dayMonthMatch = /^day-(\d{1,2})$/.exec(filterType);
      if (exactDayMatch) {
        const targetMonth = parseInt(exactDayMatch[1]) - 1;
        const targetDate = parseInt(exactDayMatch[2]);
        matchStage.createdAt = {
          $gte: new Date(year, targetMonth, targetDate),
          $lt: new Date(year, targetMonth, targetDate + 1),
        };
      } else if (dayMonthMatch) {
        const targetMonth = parseInt(dayMonthMatch[1]) - 1;
        matchStage.createdAt = {
          $gte: new Date(year, targetMonth, 1),
          $lt: new Date(year, targetMonth + 1, 1),
        };
      } else if (filterType === "month" && month) {
        matchStage.createdAt = {
          $gte: new Date(year, month - 1),
          $lt: new Date(year, month),
        };
      } else if (filterType === "quarter" && quarter) {
        matchStage.createdAt = {
          $gte: new Date(year, 0),
          $lt: new Date(+year + 1, 0),
        };
      } else {
        const start = new Date(year, 0);
        const end = new Date(+year + 1, 0);
        matchStage.createdAt = { $gte: start, $lt: end };
      }
    }

    // 1. Thống kê đơn hàng & doanh thu theo thời gian
    const orders = await Order.find(matchStage).populate("orderDetail");
    const orderStats = [];
    const revenueStats = [];

    const groupLength =
      /^day-\d{1,2}-\d{1,2}$/.test(filterType)
        ? 1
        : /^day-\d{1,2}$/.test(filterType) || filterType === "day"
        ? 31
        : filterType === "month"
        ? 12
        : filterType === "quarter"
        ? 4
        : filterType === "year"
        ? 12
        : 5;

    for (let i = 0; i < groupLength; i++) {
      orderStats[i] = 0;
      revenueStats[i] = 0;
    }

    for (const order of orders) {
      const date = new Date(order.createdAt);
      let index = 0;
      if (/^day-\d{1,2}-\d{1,2}$/.test(filterType)) index = 0;
      else if (/^day-\d{1,2}$/.test(filterType) || filterType === "day") index = date.getDate() - 1;
      else if (filterType === "month") index = date.getMonth();
      else if (filterType === "quarter") index = Math.floor(date.getMonth() / 3);
      else if (filterType === "year") index = date.getMonth(); // Sửa lại dòng này
      if (index >= 0 && index < groupLength) {
        orderStats[index] += 1;
        revenueStats[index] += order.total;
      }
    }

    // 2. Trạng thái đơn hàng (áp dụng filter)
    const filteredOrders = orders; // đã được lọc theo thời gian
    const statusCounts = {
      Pending: 0,
      Delivery: 0,
      Delivered: 0,
      Canceled: 0,
    };
    filteredOrders.forEach(order => {
      const status = (order.statusOrder || "").toLowerCase();
      if (status === "pending") statusCounts.Pending++;
      else if (status === "delivery" || status === "shipped") statusCounts.Delivery++;
      else if (status === "delivered") statusCounts.Delivered++;
      else if (status === "canceled") statusCounts.Canceled++;
    });

    // 3. Top sản phẩm bán chạy
    const productMap = new Map();
    const details = await OrderDetail.find();

    details.forEach((detail) => {
      const id = detail.Product.toString();
      productMap.set(id, (productMap.get(id) || 0) + detail.quantity);
    });

    const topProductIds = [...productMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([id]) => id);

    const products = await Product.find({ _id: { $in: topProductIds } });

    const topProducts = [...productMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([id, sold]) => {
        const prod = products.find(p => p._id.toString() === id);
        return {
          id,
          name: prod ? prod.nameProduct : `Product ${id.slice(-4)}`,
          sold
        };
      });

    return {
      orderStats,
      revenueStats,
      topProducts,
      statusCounts,
    };
  },
};

module.exports = ReportService;
