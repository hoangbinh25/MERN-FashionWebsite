import React, { useState } from "react";
import OrderDetail from "./OrderDetail";

const mockOrders = [
    {
        id: "OD001",
        date: "2025-07-10",
        status: "Delivered",
        total: 57000,
        items: [
            { name: "Fresh Strawberries", qty: 1, price: 36000 },
            { name: "Lightweight Jacket", qty: 1, price: 16000 },
        ],
        address: {
            fullName: "John Doe",
            phone: "0123 456 789",
            province: "Thành phố Hà Nội",
            district: "Quận Ba Đình",
            commune: "Phường Kim Mã",
            street: "123 Nguyen Trai, Ward 5"
        }
    },
    {
        id: "OD002",
        date: "2025-07-05",
        status: "Shipping",
        total: 36000,
        items: [
            { name: "Fresh Strawberries", qty: 1, price: 36000 },
        ],
        address: {
            fullName: "Jane Smith",
            phone: "0987 654 321",
            province: "Thành phố Hồ Chí Minh",
            district: "Quận 1",
            commune: "Phường Bến Nghé",
            street: "456 Le Loi, Ward 1"
        }
    }
];


export default function OrderHistoryPage() {
    const [selectedOrder, setSelectedOrder] = useState(null);

    return (
        <div className="max-w-6xl mx-auto py-10 px-2 md:px-4">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Order History</h2>
            {selectedOrder ? (
                <OrderDetail order={selectedOrder} onBack={() => setSelectedOrder(null)} />
            ) : (
                <div className="bg-gray-50 rounded-lg shadow p-6">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b">
                                <th className="py-2 text-left">Order ID</th>
                                <th className="py-2 text-left">Date</th>
                                <th className="py-2 text-left">Status</th>
                                <th className="py-2 text-right">Total</th>
                                <th className="py-2 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockOrders.map(order => (
                                <tr key={order.id} className="border-b hover:bg-gray-100">
                                    <td className="py-2">{order.id}</td>
                                    <td className="py-2">{order.date}</td>
                                    <td className="py-2">
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${order.status === "Delivered" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{order.status}</span>
                                    </td>
                                    <td className="py-2 text-right font-semibold">{order.total.toLocaleString()}&nbsp;₫</td>
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