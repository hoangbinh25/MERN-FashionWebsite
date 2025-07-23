import React, { useState, useEffect } from "react";
import OrderDetail from "./Detail";
import { getAllOrders } from "~/services/orderService";

function formatUSD(vnd) {
  const usd = vnd; 
  return usd.toLocaleString("en-US", { style: "currency", currency: "USD" });
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
          Order Management
        </h1>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Delivered">Delivered</option>
            <option value="Shipped">Shipped</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
          >
            <option value="date-desc">Newest</option>
            <option value="date-asc">Oldest</option>
            <option value="total-desc">Total: High to Low</option>
            <option value="total-asc">Total: Low to High</option>
          </select>
        </div>
      </div>

      {/* Order list */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-100">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-indigo-50 text-indigo-900">
              <th className="py-3 px-4 font-semibold text-left">FullName</th>
              <th className="py-3 px-4 font-semibold text-left">Phone</th>
              <th className="py-3 px-4 font-semibold text-left">Address</th>
              <th className="py-3 px-4 font-semibold text-left">Order Date</th>
              <th className="py-3 px-4 font-semibold text-right">Total</th>
              <th className="py-3 px-4 font-semibold text-center">Status</th>
              <th className="py-3 px-4 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400">
                  No orders match the selected filter.
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
                    <div className="font-medium">{order.address}</div>
                  </td>
                  <td className="py-3 px-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-4 text-right font-semibold text-gray-700">
                    {formatUSD(order.total)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {/* Replace with your StatusBadge component if available */}
                    <span className={
                      `px-2 py-1 rounded ${order.statusOrder.toLowerCase() === "pending" 
                      ? "bg-yellow-100 text-yellow-800" 
                      : order.statusOrder.toLowerCase() === "shipped" 
                      ? "bg-green-100 text-green-800" 
                      : order.statusOrder.toLowerCase() === "canceled" 
                      ? "bg-red-100 text-red-800" 
                      : order.statusOrder.toLowerCase() === "delivered" 
                      ? "bg-lime-100 text-lime-500" 
                      : "bg-gray-100 text-gray-800"}`}>
                      {order.statusOrder}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => setViewOrder(order)}
                      className="inline-flex items-center gap-1 text-indigo-600 hover:underline font-medium px-2"
                    >
                      <svg 
                      width="16" 
                      height="16" 
                      fill="none" 
                      viewBox="0 0 24 24"
                      >
                        <path 
                        d="M12 5c-7 0-9 7-9 7s2 7 9 7 9-7 9-7-2-7-9-7zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" 
                        stroke="#6366f1" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        />
                      </svg>
                      View
                    </button>
                    {/* Add delete logic if needed */}
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