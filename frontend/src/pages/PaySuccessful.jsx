export default function NotFoundPage() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                {/* 40 */}
                <div className="mb-8">
                    <div className="relative">
                        <div className="text-9xl font-bold text-gray-300 select-none">Success</div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-6xl font-bold text-indigo-600">Pay Successful</div>
                        </div>
                    </div>
                </div>

                {/* Success Message */}
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Pay Successful
                </h1>

                <p className="text-gray-600 mb-8 leading-relaxed">
                    Thank you for ordering from us. Your order is being processed.
                </p>

                {/* Action Buttons */}
                <div className="space-y-4">
                    <button
                        onClick={() => window.location.href = '/user/order'}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
                    >
                        Go To My Orders
                    </button>

                    <button
                        onClick={() => window.location.href = '/'}
                        className="w-full bg-white hover:bg-gray-50 text-indigo-600 font-semibold py-3 px-6 rounded-lg border-2 border-indigo-600 transition duration-300 transform hover:scale-105 shadow-md"
                    >
                        Continue Shopping
                    </button>
                </div>

                {/* Decorative Elements */}
                <div className="mt-12 flex justify-center space-x-2">
                    <div className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
            </div>
        </div>
    )
}