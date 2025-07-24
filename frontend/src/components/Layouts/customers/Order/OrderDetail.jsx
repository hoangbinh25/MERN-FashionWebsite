import React from "react";
import { updateOrderStatus as updateOrderStatusAPI } from "~/services/orderService";

const StatusBadge = ({ status }) => {
    let color, text;
    switch (status) {
        case "pending":
            color = "bg-yellow-100 text-yellow-800 border-yellow-300";
            text = "Chờ xác nhận";
            break;
        case "Shipped":
            color = "bg-green-100 text-green-800 border-green-300";
            text = "Đang giao";
            break;
        case "Delivered":
            color = "bg-blue-100 text-blue-800 border-blue-300";
            text = "Đã nhận";
            break;
        case "Cancelled":
        case "Hủy":
            color = "bg-red-100 text-red-700 border-red-300";
            text = "Hủy";
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
            <h2 className="text-xl font-bold mb-6 text-indigo-700 flex items-center gap-2">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M12 5c-7 0-9 7-9 7s2 7 9 7 9-7 9-7-2-7-9-7zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Chi tiết đơn hàng
            </h2>

            {/* Order Info */}
            <div className="mb-4 p-4 rounded-lg border border-indigo-100 bg-indigo-50/40">
                <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[120px]">
                        <div className="text-xs text-gray-500 font-semibold">Mã đơn hàng</div>
                        <div className="font-mono text-sm break-all whitespace-pre-line">{order._id}</div>
                    </div>
                    <div className="flex-1 min-w-[120px]">
                        <div className="text-xs text-gray-500 font-semibold">Ngày đặt</div>
                        <div className="text-sm">{new Date(order.createdAt).toLocaleDateString()}</div>
                    </div>
                    <div className="flex-1 min-w-[120px]">
                        <div className="text-xs text-gray-500 font-semibold">Trạng thái</div>
                        <StatusBadge status={order.statusOrder} />
                    </div>
                </div>
            </div>

            {/* Shipping Address */}
            <div className="mb-4 p-4 rounded-lg border border-green-100 bg-green-50/40">
                <div className="text-xs text-gray-500 font-semibold mb-1">Địa chỉ giao hàng</div>
                <div className="text-sm">
                    {order.address.split(',').map((line, index) => (
                        <div key={index}>{line.trim()}</div>
                    ))}</div>
            </div>

            {/* Product List */}
            <div className="mb-4 p-4 rounded-lg border border-blue-100 bg-blue-50/40">
                <div className="font-semibold text-indigo-700 mb-2">Sản phẩm</div>
                <ul className="list-disc pl-6 space-y-1">
                    {order.orderDetail.map((item, idx) => (
                        <li key={item._id} className="flex justify-between items-center">
                            <span>
                                <span className="font-semibold">{item.Product?.nameProduct}</span>
                                {" — "}
                                {item.quantity} x {item.price.toLocaleString("vi-VN", { style: "currency", currency: "VND", minimumFractionDigits: 0 })}
                            </span>
                            <span className="text-xs text-gray-500">
                                {(item.price * item.quantity).toLocaleString("vi-VN", { style: "currency", currency: "VND", minimumFractionDigits: 0 })}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Total */}
            <div className="mb-4 p-4 rounded-lg border border-yellow-100 bg-yellow-50/40 text-right">
                <div className="flex flex-col gap-1 items-end">

                    <div className="flex justify-between w-full max-w-xs text-base font-bold">
                        <span>Tổng:</span>
                        <span>{order.total.toLocaleString("vi-VN", { style: "currency", currency: "VND", minimumFractionDigits: 0 })}</span>
                    </div>
                </div>
            </div>

            {/* Action Button */}
            {order.statusOrder.toLowerCase() === "pending" && (
                <div className="flex justify-end">
                    <button
                        onClick={handleCancelOrder}
                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg text-sm font-semibold shadow transition"
                    >
                        Hủy đơn hàng
                    </button>
                </div>
            )}
        </div>
    );
}
