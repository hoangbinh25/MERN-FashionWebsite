import React from "react";

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

function getTotal(items) {
  return items.reduce((sum, item) => sum + item.quantity * item.price, 0);
}

export default function OrderDetail({ order, onClose }) {
  if (!order) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl"
          aria-label="Đóng"
        >
          ×
        </button>
        <h2 className="text-xl font-semibold text-indigo-700 mb-4 flex items-center gap-2">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M12 5c-7 0-9 7-9 7s2 7 9 7 9-7 9-7-2-7-9-7zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Order Details
        </h2>
        <div className="space-y-2 text-sm">
          <div><span className="font-medium">Order ID:</span> <span className="font-mono">{order.id}</span></div>
          <div><span className="font-medium">Customer:</span> {order.customerName}</div>
          <div><span className="font-medium">Phone:</span> {order.phone}</div>
          <div><span className="font-medium">Address:</span> {order.address}</div>
          <div><span className="font-medium">Order Date:</span> {order.orderDate}</div>
          <div><span className="font-medium">Status:</span> <StatusBadge status={order.status} /></div>
          <div className="pt-2">
            <span className="font-medium">Products:</span>
            <ul className="list-disc pl-6 mt-1 space-y-1">
              {order.items.map((item, idx) => (
                <li key={idx}>
                  <span className="font-semibold">{item.name}</span> — {item.quantity} x {item.price.toLocaleString()} VND
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-2 text-right text-base font-bold text-indigo-700">
            Total	: {getTotal(order.items).toLocaleString()} VND
          </div>
        </div>
        <div className="flex justify-end pt-4">
          <button
            onClick={onClose}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-semibold shadow transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}