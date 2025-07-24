import React, { useState, useEffect } from "react";
import OrderDetail from "./Detail";
import { getAllOrders } from "~/services/orderService";

function formatVND(amount) {
  return amount.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
}

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("date-desc");
  const [viewOrder, setViewOrder] = useState(null);

  const loadOrders = () => {
    getAllOrders({ status: filterStatus, sortBy })
      .then(data => {
        setOrders(data);
        console.log("Orders loaded:", data);
      })
      .catch(error => {
        console.error("Error fetching orders:", error);
      });
  };

  useEffect(() => {
    loadOrders();
  }, [filterStatus, sortBy]);

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M3 6h18M3 6l1.5 13.5A2 2 0 0 0 6.5 21h11a2 2 0 0 0 2-1.5L21 6M3 6l1.5-3A2 2 0 0 1 6.5 2h11a2 2 0 0 1 2 1.5L21 6" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Quản lý đơn hàng
        </h1>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
          >
            <option value="All">Tất cả</option>
            <option value="pending">Chờ xác nhận</option>
            <option value="delivered">Đã giao</option>
            <option value="shipped">Đang giao</option>
            <option value="canceled">Đã Hủy</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
          >
            <option value="date-desc">Mới nhất</option>
            <option value="date-asc">Cũ nhất</option>
            <option value="total-desc">Tổng: Cao - Thấp</option>
            <option value="total-asc">Tổng: Thấp - Cao</option>
          </select>
        </div>
      </div>

      {/* Order list */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-100">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-indigo-50 text-indigo-900">
              <th className="py-3 px-4 font-semibold text-left">Tên</th>
              <th className="py-3 px-4 font-semibold text-left">Số điện thoại</th>
              <th className="py-3 px-4 font-semibold text-left">Địa chỉ</th>
              <th className="py-3 px-4 font-semibold text-left">Ngày đặt</th>
              <th className="py-3 px-4 font-semibold text-right">Tổng tiền</th>
              <th className="py-3 px-4 font-semibold text-center">Trạng thái</th>
              <th className="py-3 px-4 font-semibold text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-400">
                  Không có đơn hàng nào khớp với bộ lọc đã chọn.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id} className="border-b last:border-b-0 hover:bg-indigo-50/40 transition">
                  <td className="py-3 px-4 font-mono font-semibold text-indigo-700">{order.fullName}</td>
                  <td className="py-3 px-4">
                    <div className="font-medium">{order.phone}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-sm max-w-xs truncate" title={order.address}>
                      {order.address}
                    </div>
                  </td>
                  <td className="py-3 px-4">{new Date(order.createdAt).toLocaleDateString('vi-VN')}</td>
                  <td className="py-3 px-4 text-right font-bold text-green-600">
                    {formatVND(order.total)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={
                      `px-3 py-1 rounded-full text-xs font-medium ${order.statusOrder.toLowerCase() === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.statusOrder.toLowerCase() === "shipped"
                          ? "bg-blue-100 text-blue-800"
                          : order.statusOrder.toLowerCase() === "canceled"
                            ? "bg-red-100 text-red-800"
                            : order.statusOrder.toLowerCase() === "delivered"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"}`}>
                      {order.statusOrder.toLowerCase() === "pending"
                        ? "Chờ xác nhận"
                        : order.statusOrder.toLowerCase() === "shipped"
                          ? "Đang giao"
                          : order.statusOrder.toLowerCase() === "canceled"
                            ? "Đã hủy"
                            : order.statusOrder.toLowerCase() === "delivered"
                              ? "Đã giao"
                              : order.statusOrder}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => setViewOrder(order)}
                      className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 font-medium px-3 py-1 rounded-lg transition-colors"
                    >
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 5c-7 0-9 7-9 7s2 7 9 7 9-7 9-7-2-7-9-7zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Xem chi tiết
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Order detail modal */}
      <OrderDetail order={viewOrder} onClose={() => {
        setViewOrder(null);
        loadOrders(); // Reload orders after closing detail view
      }} />
    </div>
  );
}