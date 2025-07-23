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
  const usd = vnd;
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
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg relative animate-fadeIn flex flex-col max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl"
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-xl font-bold text-indigo-700 mb-6 flex items-center gap-2">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M12 5c-7 0-9 7-9 7s2 7 9 7 9-7 9-7-2-7-9-7zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Order Details
        </h2>
        {/* Nội dung cuộn */}
        <div className="flex-1 min-h-0 overflow-y-auto pr-1">
          {/* Order Info */}
          <div className="mb-4 p-4 rounded-lg border border-indigo-100 bg-indigo-50/40">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[120px]">
                <div className="text-xs text-gray-500 font-semibold">Order ID</div>
                <div className="font-mono text-sm break-all whitespace-pre-line">{order._id}</div>
              </div>
              <div className="flex-1 min-w-[120px]">
                <div className="text-xs text-gray-500 font-semibold">Order Date</div>
                <div className="text-sm">{new Date(order.createdAt).toLocaleDateString()}</div>
              </div>
              <div className="flex-1 min-w-[120px]">
                <div className="text-xs text-gray-500 font-semibold">Status</div>
                <StatusBadge status={order.statusOrder} />
              </div>
            </div>
          </div>
          {/* Customer Info */}
          <div className="mb-4 p-4 rounded-lg border border-green-100 bg-green-50/40">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[120px]">
                <div className="text-xs text-gray-500 font-semibold">Customer</div>
                <div className="text-sm">{order.fullName}</div>
              </div>
              <div className="flex-1 min-w-[120px]">
                <div className="text-xs text-gray-500 font-semibold">Phone</div>
                <div className="text-sm">{order.phone}</div>
              </div>
              <div className="flex-1 min-w-[120px]">
                <div className="text-xs text-gray-500 font-semibold">Address</div>
                <div className="text-sm">{order.address}</div>
              </div>
            </div>
          </div>
          {/* Product List */}
          <div className="mb-4 p-4 rounded-lg border border-blue-100 bg-blue-50/40">
            <div className="font-semibold text-indigo-700 mb-2">Products</div>
            <ul className="list-disc pl-6 space-y-1">
              {order.orderDetail && order.orderDetail.length > 0 ? (
                order.orderDetail.map((item, idx) => (
                  <li key={idx} className="flex justify-between items-center">
                    <span>
                      <span className="font-semibold">{item.Product?.nameProduct || "Unknown"}</span>
                      {" — "}
                      {item.quantity} x {formatUSD(item.price)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatUSD(item.quantity * item.price)}
                    </span>
                  </li>
                ))
              ) : (
                <li>No products found.</li>
              )}
            </ul>
          </div>
        </div>
        {/* Total và Action Buttons cố định dưới */}
        <div className="pt-2">
          <div className="mb-2 p-4 rounded-lg border border-yellow-100 bg-yellow-50/40 text-right">
            <span className="font-bold text-base text-indigo-700">
              Total: {formatUSD(getTotal(order.orderDetail))}
            </span>
          </div>
          <div className="flex flex-wrap justify-end gap-2">
            {order.statusOrder && order.statusOrder.toLowerCase() === "pending" && (
              <>
                <button
                  onClick={() => {
                    handleStatusChange("Shipped");
                    onClose();
                  }}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-semibold shadow transition"
                >
                  Shipped
                </button>
                <button
                  onClick={() => {
                    handleStatusChange("Canceled");
                    onClose();
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 ml-2 rounded-lg text-sm font-semibold shadow transition"
                >
                  Canceled
                </button>
              </>
            )}
            {order.statusOrder && order.statusOrder.toLowerCase() === "shipped" && (
              <button
                onClick={() => {
                  handleStatusChange("Delivered");
                  onClose();
                }}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-semibold shadow transition"
              >
                Delivered
              </button>
            )}
            {order.statusOrder && order.statusOrder.toLowerCase() === "canceled" && (
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
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-lg text-sm font-semibold shadow transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}