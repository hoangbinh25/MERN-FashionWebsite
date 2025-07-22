import { Link } from "react-router-dom";

export default function AuthToggle({ isLogin }) {
    return (
        <div className="mt-6">
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                        {isLogin ? 'New to COZA STORE?' : 'Already have an account?'}
                    </span>
                </div>
            </div>

            <div className="mt-6">
                {isLogin ? (
                    <Link
                        to="/auth/register"
                        className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Tạo tài khoản mới
                    </Link>
                ) : (
                    <Link
                        to="/auth/login"
                        className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Đăng nhập với tài khoản của bạn
                    </Link>
                )}
            </div>
        </div>
    );
};