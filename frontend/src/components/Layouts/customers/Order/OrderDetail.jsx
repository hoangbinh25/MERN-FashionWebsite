import React from "react";

export default function OrderDetail({ order, onBack }) {
    if (!order) return null;
    const subtotal = order.orderDetail.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = order.total - subtotal;

    return (
        <div className="max-w-3xl mx-auto bg-gray-50 rounded-lg shadow p-6">
            <button
                className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-700 font-semibold"
                onClick={onBack}
            >
                ← Back to Order History
            </button>
            <h2 className="text-xl font-bold mb-4 text-gray-800">Order Detail</h2>
            <div className="mb-4">
                <span className="font-semibold">Order ID:</span> {order._id}<br />
                <span className="font-semibold">Date:</span> {new Date(order.createdAt).toLocaleDateString()}<br />
                <span className="font-semibold">Status:</span> <span className={`px-2 py-1 rounded text-xs font-semibold ${order.statusOrder === "Delivered" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{order.statusOrder}</span>
            </div>
            <div className="mb-6">
                <h3 className="font-semibold mb-2">Shipping Address</h3>
                <div className="text-sm space-y-1">
                    <div>{order.address}</div>
                </div>
            </div>
            <div className="mb-6">
                <h3 className="font-semibold mb-2">Products</h3>
                <div className="space-y-2">
                    {order.orderDetail.map((item, idx) => (
                        <div key={item._id} className="flex justify-between items-center text-base py-2 border-b last:border-b-0">
                            <span className="font-medium text-gray-700">
                                {item.Product?.nameProduct} <span className="text-gray-400">x{item.quantity}</span>
                            </span>
                            <span className="font-semibold text-indigo-600">
                                {item.price.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 })}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="space-y-1">
                <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span className="font-semibold">{subtotal.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span>Shipping:</span>
                    <span className="font-semibold">{shipping.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>{order.total.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 })}</span>
                </div>
            </div>
        </div>
    );
}