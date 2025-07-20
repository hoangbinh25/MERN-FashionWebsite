import React, { useState, useEffect } from "react";
import { updateOrderStatus as updateOrderStatusAPI } from "~/services/orderService";

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

function getTotal(orderDetail) {
  if (!orderDetail) return 0;
  return orderDetail.reduce((sum, item) => sum + item.quantity * item.price, 0);
}

function formatUSD(vnd) {
  const usd = vnd ;
  return usd.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export default function OrderDetail({ order, onClose }) {
  const [status, setStatus] = useState(order?.statusOrder);

  const handleStatusChange = (newStatus) => {
    updateOrderStatusAPI(order._id, newStatus)
      .then(() => {
        setStatus(newStatus);
        onClose();
      })
      .catch((error) => {
        console.error("Error updating order status:", error);
      });
  };

  if (!order) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl"
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-xl font-semibold text-indigo-700 mb-4 flex items-center gap-2">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M12 5c-7 0-9 7-9 7s2 7 9 7 9-7 9-7-2-7-9-7zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Order Details
        </h2>
        <div className="space-y-2 text-sm">
          <div><span className="font-medium">Order ID:</span> <span className="font-mono">{order._id}</span></div>
          <div><span className="font-medium">Customer:</span> {order.fullName}</div>
          <div><span className="font-medium">Phone:</span> {order.phone}</div>
          <div><span className="font-medium">Address:</span> {order.address}</div>
          <div><span className="font-medium">Order Date:</span> {new Date(order.createdAt).toLocaleDateString()}</div>
          <div><span className="font-medium">Status:</span> <StatusBadge status={order.statusOrder} /></div>
          <div className="pt-2">
            <span className="font-medium">Products:</span>
            <ul className="list-disc pl-6 mt-1 space-y-1">
              {order.orderDetail && order.orderDetail.length > 0 ? (
                order.orderDetail.map((item, idx) => (
                  <li key={idx}>
                    <span className="font-semibold">{item.Product?.nameProduct || "Unknown"}</span>
                    {" — "}
                    {item.quantity} x {formatUSD(item.price)}
                  </li>
                ))
              ) : (
                <li>No products found.</li>
              )}
            </ul>
          </div>
          <div className="pt-2 text-right text-base font-bold text-indigo-700">
            Total: {formatUSD(getTotal(order.orderDetail))}
          </div>
        </div>
        <div className="flex justify-end pt-4">
          {order.statusOrder && order.statusOrder.toLowerCase() === "pending" && (
            <button
              onClick={() => {
                handleStatusChange("Shipped");
                onClose();
              }}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-semibold shadow transition"
            >
              Shipped
            </button>
          )}
          {order.statusOrder && order.statusOrder.toLowerCase() === "shipped" && (
            <button
              onClick={() => {
                handleStatusChange("Cancelled");
                onClose();
              }}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-semibold shadow transition"
            >
              Cancelled
            </button>
          )}
          {order.statusOrder && order.statusOrder.toLowerCase() === "cancelled" && (
            <button
              onClick={() => {
                handleStatusChange("Pending");
                onClose();
              }}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-semibold shadow transition"
            >
              Pending
            </button>
          )}

          <button
            onClick={onClose}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 ml-2 rounded-lg text-sm font-semibold shadow transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}