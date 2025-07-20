import React, { useState, useEffect } from "react";
import OrderDetail from "./OrderDetail";
import { getOrdersByUser } from "~/services/orderService";

export default function OrderHistoryPage() {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orders, setOrders] = useState([]);

    const User = JSON.parse(localStorage.getItem("user"));
    const loadOrders = () => {
        getOrdersByUser(User._id || User.id)
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
    }, []);

    return (
        <div className="max-w-6xl mx-auto py-10 px-2 md:px-4 min-h-screen">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Order History</h2>
            {selectedOrder ? (
                <OrderDetail order={selectedOrder} onBack={() => setSelectedOrder(null)} />
            ) : (
                <div className="bg-gray-50 rounded-lg shadow p-6">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b">
                                <th className="py-2 text-left">Order Id</th>
                                <th className="py-2 text-left">Date</th>
                                <th className="py-2 text-left">Status</th>
                                <th className="py-2 text-left">Payment Method</th>
                                <th className="py-2 text-left">Products</th>
                                <th className="py-2 text-right">Total</th>
                                <th className="py-2 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id} className="border-b hover:bg-gray-100">
                                    <td className="py-2">{order._id}</td>
                                    <td className="py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td className="py-2">
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${order.statusOrder === "Delivered" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{order.statusOrder}</span>
                                    </td>
                                    <td className="py-2">
                                        <span>{order.statusPayment === "cod" ? "Cash on Delivery" : "Online Payment"}</span>
                                    </td>
                                    <td className="py-2">
                                        {order.orderDetail.map((item, idx) => (
                                            <div key={item._id} className="mb-1">
                                                <span className="font-medium">{item.Product?.nameProduct}</span>
                                                <span className="text-gray-400"> x{item.quantity}</span>
                                            </div>
                                        ))}
                                    </td>
                                    <td className="py-2 text-right font-semibold">
                                        {order.total.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 })}
                                    </td>
                                    <td className="py-2 text-center">
                                        <button
                                            className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs font-semibold"
                                            onClick={() => setSelectedOrder(order)}
                                        >
                                            View Detail
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}