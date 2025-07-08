import React, { useState } from "react";
import OrderDetail from "./Detail";

// Icon SVGs (can be moved to a separate file if desired)
const StatusBadge = ({ status }) => {
  let color, text;
  switch (status) {
    case "Pending":
      color = "bg-yellow-100 text-yellow-800 border-yellow-300";
      text = "Pending";
      break;
    case "Shipped":
      color = "bg-green-100 text-green-800 border-green-300";
      text = "Shipped";
      break;
    case "Cancelled":
      color = "bg-red-100 text-red-700 border-red-300";
      text = "Cancelled";
      break;
    default:
      color = "bg-gray-100 text-gray-700 border-gray-300";
      text = status;
  }
  return (
    <span className={`inline-block border px-2 py-0.5 rounded-full text-xs font-semibold ${color}`}>
      {text}
    </span>
  );
};

const sampleOrders = [
  {
    id: "ORD001",
    customerName: "Nguyen Van A",
    phone: "0901234567",
    address: "123 Le Loi, Da Nang",
    orderDate: "2025-07-01",
    status: "Pending",
    items: [
      { name: "T-shirt", quantity: 2, price: 150000 },
      { name: "Jeans", quantity: 1, price: 350000 },
    ],
  },
  {
    id: "ORD002",
    customerName: "Tran Thi B",
    phone: "0912345678",
    address: "456 Tran Phu, Da Nang",
    orderDate: "2025-07-02",
    status: "Shipped",
    items: [
      { name: "Dress", quantity: 1, price: 400000 },
    ],
  },
  {
    id: "ORD003",
    customerName: "Le Van C",
    phone: "0987654321",
    address: "789 Nguyen Hue, Da Nang",
    orderDate: "2025-07-03",
    status: "Cancelled",
    items: [
      { name: "Shirt", quantity: 3, price: 200000 },
    ],
  },
];

function getTotal(items) {
  return items.reduce((sum, item) => sum + item.quantity * item.price, 0);
}

export default function Orders() {
  const [orders, setOrders] = useState(sampleOrders);
  const [viewOrder, setViewOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("date-desc");

  // Delete order
  const handleDelete = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  // Filter and sort orders
  const filteredAndSortedOrders = () => {
    let result = filterStatus === "All" ? [...orders] : orders.filter(order => order.status === filterStatus);
    
    switch (sortBy) {
      case "date-desc":
        return result.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
      case "date-asc":
        return result.sort((a, b) => new Date(a.orderDate) - new Date(b.orderDate));
      case "total-desc":
        return result.sort((a, b) => getTotal(b.items) - getTotal(a.items));
      case "total-asc":
        return result.sort((a, b) => getTotal(a.items) - getTotal(b.items));
      default:
        return result;
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M3 6h18M3 6l1.5 13.5A2 2 0 0 0 6.5 21h11a2 2 0 0 0 2-1.5L21 6M3 6l1.5-3A2 2 0 0 1 6.5 2h11a2 2 0 0 1 2 1.5L21 6" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
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
              <th className="py-3 px-4 font-semibold text-left">Order ID</th>
              <th className="py-3 px-4 font-semibold text-left">Customer</th>
              <th className="py-3 px-4 font-semibold text-left">Order Date</th>
              <th className="py-3 px-4 font-semibold text-right">Total</th>
              <th className="py-3 px-4 font-semibold text-center">Status</th>
              <th className="py-3 px-4 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedOrders().length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400">
                  No orders match the selected filter.
                </td>
              </tr>
            ) : (
              filteredAndSortedOrders().map((order) => (
                <tr key={order.id} className="border-b last:border-b-0 hover:bg-indigo-50/40 transition">
                  <td className="py-3 px-4 font-mono font-semibold text-indigo-700">{order.id}</td>
                  <td className="py-3 px-4">
                    <div className="font-medium">{order.customerName}</div>
                    <div className="text-xs text-gray-400">{order.phone}</div>
                  </td>
                  <td className="py-3 px-4">{order.orderDate}</td>
                  <td className="py-3 px-4 text-right font-semibold text-gray-700">{getTotal(order.items).toLocaleString()} <span className="text-xs text-gray-400">VND</span></td>
                  <td className="py-3 px-4 text-center">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => setViewOrder(order)}
                      className="inline-flex items-center gap-1 text-indigo-600 hover:underline font-medium px-2"
                    >
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M12 5c-7 0-9 7-9 7s2 7 9 7 9-7 9-7-2-7-9-7zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="inline-flex items-center gap-1 text-red-500 hover:underline font-medium px-2"
                    >
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M6 7h12M9 7V5a3 3 0 0 1 6 0v2m2 0v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7h12z" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Order detail modal */}
      <OrderDetail order={viewOrder} onClose={() => setViewOrder(null)} />
    </div>
  );
}