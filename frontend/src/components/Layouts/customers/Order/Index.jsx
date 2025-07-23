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
        <div className="max-w-screen-2xl mx-auto py-10 px-2 md:px-4 min-h-screen">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Lịch sử đơn hàng</h2>
            {selectedOrder ? (
                <OrderDetail order={selectedOrder} onBack={() => setSelectedOrder(null)} />
            ) : (
                <div className="bg-gray-50 rounded-lg shadow p-6">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b">
                                <th className="py-2 text-left">Mã đơn</th>
                                <th className="py-2 text-left">Ngày</th>
                                <th className="py-2 text-left">Trạng thái</th>
                                <th className="py-2 text-left">Phương thức thanh toán</th>
                                <th className="py-2 text-left">Sản phẩm</th>
                                <th className="py-2 text-right">Tổng tiền:</th>
                                <th className="py-2 text-center">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id} className="border-b hover:bg-gray-100">
                                    <td className="py-2">{order._id}</td>
                                    <td className="py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td className="py-2">
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${order.statusOrder === "Đã giao" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{order.statusOrder}</span>
                                    </td>
                                    <td className="py-2">
                                        <span>{order.statusPayment === "cod" ? "Thanh toán khi nhận hàng" : "Thanh toán online"}</span>
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
                                        {order.total.toLocaleString("vi-VN", { style: "currency", currency: "VND", minimumFractionDigits: 0 })}
                                    </td>
                                    <td className="py-2 text-center">
                                        <button
                                            className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs font-semibold"
                                            onClick={() => setSelectedOrder(order)}
                                        >
                                            Xem chi tiết
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