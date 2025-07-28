import { CheckCircle, ShoppingBag, Package } from "lucide-react";

export default function PaymentSuccessPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center px-4 py-8">
            <div className="max-w-lg w-full">
                {/* Success Card */}
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 text-center">
                    {/* Success Icon with Animation */}
                    <div className="mb-6 relative">
                        <div className="mx-auto w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                            <CheckCircle className="w-12 h-12 text-white" />
                        </div>
                        {/* Floating particles */}
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
                        <div className="absolute -bottom-1 -left-2 w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                        <div className="absolute top-1 -left-4 w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
                    </div>

                    {/* Success Title */}
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">
                        Thanh toán thành công!
                    </h1>

                    {/* Success Message */}
                    <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                        Cảm ơn bạn đã đặt hàng từ TBN Store. <br />
                        Đơn hàng của bạn đang được xử lý.
                    </p>

                    {/* Order Status */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8 border border-blue-100">
                        <div className="flex items-center justify-center space-x-4 text-blue-700">
                            <Package className="w-6 h-6" />
                            <span className="font-medium">Đơn hàng đang được chuẩn bị</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-4">
                        <button
                            onClick={() => window.location.href = '/user/order'}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg group"
                        >
                            <div className="flex items-center justify-center space-x-2">
                                <Package className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                                <span>Xem đơn hàng của tôi</span>
                            </div>
                        </button>

                        <button
                            onClick={() => window.location.href = '/'}
                            className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-6 rounded-2xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg group"
                        >
                            <div className="flex items-center justify-center space-x-2">
                                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                                <span>Tiếp tục mua sắm</span>
                            </div>
                        </button>
                    </div>

                    {/* Decorative Elements */}
                    {/* <div className="mt-8 flex justify-center space-x-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full animate-ping"></div>
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></div>
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full animate-ping" style={{ animationDelay: '0.6s' }}></div>
                    </div> */}
                </div>

                {/* Additional Info Card */}
                <div className="mt-6 bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-lg">
                    <div className="text-center">
                        <h3 className="font-semibold text-gray-800 mb-2">Bước tiếp theo</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Chúng tôi sẽ gửi email xác nhận và thông tin theo dõi đơn hàng đến địa chỉ email của bạn trong vòng 5-10 phút.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}