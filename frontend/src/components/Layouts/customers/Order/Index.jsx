import React, { useState, useEffect } from "react";
import { Package, Calendar, CreditCard, Eye, Clock, Truck, CheckCircle, XCircle, Search, Filter } from "lucide-react";
import OrderDetail from "./OrderDetail";
import { getOrdersByUser } from "~/services/orderService";

export default function OrderHistoryPage() {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [loading, setLoading] = useState(true);

    const getUser = () => {
        try {
            const userData = localStorage.getItem("user");
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            console.error("Error parsing user data:", error);
            return null;
        }
    };

    const loadOrders = async () => {
        try {
            setLoading(true);
            const user = getUser();
            if (!user) {
                console.error("No user found");
                return;
            }

            const data = await getOrdersByUser(user._id || user.id);
            setOrders(data);
            console.log("Orders loaded:", data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    const getStatusInfo = (status) => {
        const statusMap = {
            pending: {
                label: "Chờ xác nhận",
                color: "bg-yellow-100 text-yellow-800 border-yellow-200",
                icon: Clock
            },
            shipped: {
                label: "Đang giao",
                color: "bg-blue-100 text-blue-800 border-blue-200",
                icon: Truck
            },
            delivered: {
                label: "Đã nhận",
                color: "bg-green-100 text-green-800 border-green-200",
                icon: CheckCircle
            },
            canceled: {
                label: "Đã hủy",
                color: "bg-red-100 text-red-800 border-red-200",
                icon: XCircle
            }
        };
        return statusMap[status] || statusMap.pending;
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.orderDetail.some(item =>
                item.Product?.nameProduct.toLowerCase().includes(searchTerm.toLowerCase())
            );
        const matchesStatus = statusFilter === "all" || order.statusOrder === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleOrderSelect = (order) => {
        setSelectedOrder(order);
    };

    const handleBackToList = () => {
        setSelectedOrder(null);
        loadOrders(); // Reload orders when coming back from detail
    };

    if (selectedOrder) {
        return (
            <div className="max-w-screen-2xl mx-auto py-10 px-2 md:px-4 min-h-screen">
                <OrderDetail order={selectedOrder} onBack={handleBackToList} />
            </div>
        );
    }

    return (
        <div className="max-w-screen-2xl mx-auto py-10 px-2 md:px-4 min-h-screen bg-gray-50">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Lịch sử đơn hàng</h1>
                <p className="text-gray-600">Theo dõi và quản lý tất cả đơn hàng của bạn</p>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo mã đơn hoặc tên sản phẩm..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="pl-10 pr-8 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                        >
                            <option value="all">Tất cả trạng thái</option>
                            <option value="pending">Chờ xác nhận</option>
                            <option value="shipped">Đang giao</option>
                            <option value="delivered">Đã nhận</option>
                            <option value="canceled">Đã hủy</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Orders Grid - Mobile First Design */}
            <div className="space-y-4">
                {loading ? (
                    <div className="bg-white rounded-xl p-12 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                        <p className="text-gray-500">Đang tải đơn hàng...</p>
                    </div>
                ) : filteredOrders.length === 0 ? (
                    <div className="bg-white rounded-xl p-12 text-center">
                        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            {orders.length === 0 ? "Chưa có đơn hàng nào" : "Không tìm thấy đơn hàng"}
                        </h3>
                        <p className="text-gray-500">
                            {orders.length === 0
                                ? "Bạn chưa có đơn hàng nào. Hãy bắt đầu mua sắm!"
                                : "Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc"}
                        </p>
                    </div>
                ) : (
                    filteredOrders.map(order => {
                        const statusInfo = getStatusInfo(order.statusOrder);
                        const StatusIcon = statusInfo.icon;

                        return (
                            <div key={order._id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                                {/* Mobile Layout */}
                                <div className="p-6 md:hidden">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Mã đơn hàng</p>
                                            <p className="font-mono text-sm font-medium">{order._id}</p>
                                        </div>
                                        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${statusInfo.color}`}>
                                            <StatusIcon className="w-4 h-4" />
                                            <span className="text-sm font-medium">{statusInfo.label}</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Ngày đặt</p>
                                            <p className="text-sm font-medium">{new Date(order.createdAt).toLocaleDateString('vi-VN')}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Thanh toán</p>
                                            <p className="text-sm font-medium">
                                                {order.statusPayment === "cod" ? "COD" : "Online"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <p className="text-sm text-gray-500 mb-2">Sản phẩm</p>
                                        <div className="space-y-1">
                                            {order.orderDetail.map((item, idx) => (
                                                <div key={item._id} className="flex justify-between text-sm">
                                                    <span className="text-gray-800">{item.Product?.nameProduct}</span>
                                                    <span className="text-gray-500">x{item.quantity}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm text-gray-500">Tổng tiền</p>
                                            <p className="text-lg font-bold text-indigo-600">
                                                {order.total.toLocaleString("vi-VN", { style: "currency", currency: "VND", minimumFractionDigits: 0 })}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => handleOrderSelect(order)}
                                            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                                        >
                                            <Eye className="w-4 h-4" />
                                            <span>Chi tiết</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Desktop Layout */}
                                <div className="hidden md:block">
                                    <div className="grid grid-cols-12 gap-4 p-6 items-center">
                                        <div className="col-span-2">
                                            <p className="text-sm text-gray-500 mb-1">Mã đơn</p>
                                            <p className="font-mono text-sm font-medium">{order._id}</p>
                                        </div>

                                        <div className="col-span-1">
                                            <p className="text-sm text-gray-500 mb-1">Ngày</p>
                                            <div className="flex items-center space-x-2">
                                                <Calendar className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm">{new Date(order.createdAt).toLocaleDateString('vi-VN')}</span>
                                            </div>
                                        </div>

                                        <div className="col-span-2">
                                            <p className="text-sm text-gray-500 mb-1">Trạng thái</p>
                                            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border w-fit ${statusInfo.color}`}>
                                                <StatusIcon className="w-4 h-4" />
                                                <span className="text-sm font-medium">{statusInfo.label}</span>
                                            </div>
                                        </div>

                                        <div className="col-span-2">
                                            <p className="text-sm text-gray-500 mb-1">Thanh toán</p>
                                            <div className="flex items-center space-x-2">
                                                <CreditCard className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm">
                                                    {order.statusPayment === "cod" ? "Thanh toán khi nhận hàng" : "Thanh toán online"}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="col-span-3">
                                            <p className="text-sm text-gray-500 mb-1">Sản phẩm</p>
                                            <div className="space-y-1">
                                                {order.orderDetail.map((item, idx) => (
                                                    <div key={item._id} className="text-sm">
                                                        <span className="font-medium text-gray-800">{item.Product?.nameProduct}</span>
                                                        <span className="text-gray-500 ml-2">x{item.quantity}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="col-span-1 text-right">
                                            <p className="text-sm text-gray-500 mb-1">Tổng tiền</p>
                                            <p className="font-bold text-indigo-600">
                                                {order.total.toLocaleString("vi-VN", { style: "currency", currency: "VND", minimumFractionDigits: 0 })}
                                            </p>
                                        </div>

                                        <div className="col-span-1 text-center">
                                            <button
                                                onClick={() => handleOrderSelect(order)}
                                                className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors mx-auto"
                                            >
                                                <Eye className="w-4 h-4" />
                                                <span>Chi tiết</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}