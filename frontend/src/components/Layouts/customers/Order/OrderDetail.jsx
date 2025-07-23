import React from "react";
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
        case "Delivered":
            color = "bg-blue-100 text-blue-800 border-blue-300";
            text = "Delivered";
            break;
        case "Cancelled":
        case "Canceled":
            color = "bg-red-100 text-red-700 border-red-300";
            text = "Canceled";
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

export default function OrderDetail({ order, onBack }) {
    if (!order) return null;
    const subtotal = order.orderDetail.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = order.total - subtotal;

    // Cập nhật trạng thái hủy đơn
    const handleCancelOrder = async () => {
        if (!window.confirm("Are you sure you want to cancel this order?")) return;
        try {
            await updateOrderStatusAPI(order._id, "Canceled");
            alert("Order has been canceled.");
            onBack();
        } catch (err) {
            alert("Cancel order failed!");
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-6">
            <button
                className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-700 font-semibold"
                onClick={onBack}
            >
                ← Quay lại lịch sử đơn hàng
            </button>
            <h2 className="text-xl font-bold mb-4 text-gray-800">Chi tiết đơn hàng</h2>
            <div className="mb-4">
                <span className="font-semibold">Mã đơn:</span> {order._id}<br />
                <span className="font-semibold">Ngày đặt:</span> {new Date(order.createdAt).toLocaleDateString()}<br />
                <span className="font-semibold">Trạng thái:</span> <span className={`px-2 py-1 rounded text-xs font-semibold ${order.statusOrder === "Đã giao" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{order.statusOrder}</span>
            </div>
            <div className="mb-6">
                <h3 className="font-semibold mb-2">Địa chỉ giao hàng</h3>
                <div className="text-sm space-y-1">
                    <div>{order.address}</div>
                </div>
            </div>
            <div className="mb-6">
                <h3 className="font-semibold mb-2">Sản phẩm</h3>
                <div className="space-y-2">
                    {order.orderDetail.map((item, idx) => (
                        <li key={item._id} className="flex justify-between items-center">
                            <span>
                                <span className="font-semibold">{item.Product?.nameProduct}</span>
                                {" — "}
                                {item.quantity} x {item.price.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 })}
                            </span>
                            <span className="font-semibold text-indigo-600">
                                {item.price.toLocaleString("vi-VN", { style: "currency", currency: "VND", minimumFractionDigits: 0 })}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="space-y-1">
                {/* <div className="flex justify-between text-sm">
                    <span>Tổng tiền:</span>
                    <span className="font-semibold">{subtotal.toLocaleString("vi-VN", { style: "currency", currency: "VND", minimumFractionDigits: 0 })}</span>
                </div> */}
                <div className="flex justify-between text-lg font-bold">
                    <span>Tổng tiền:</span>
                    <span>{order.total.toLocaleString("vi-VN", { style: "currency", currency: "VND", minimumFractionDigits: 0 })}</span>
                </div>
            </div>

            {/* Action Button */}
            {order.statusOrder.toLowerCase() === "pending" && (
                <div className="flex justify-end">
                    <button
                        onClick={handleCancelOrder}
                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg text-sm font-semibold shadow transition"
                    >
                        Cancel Order
                    </button>
                </div>
            )}
        </div>
    );
}