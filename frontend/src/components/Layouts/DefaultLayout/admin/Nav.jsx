import { useState } from "react";
import { Bell, User, Menu } from "lucide-react";
import { useAuth } from "~/context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Nav({ onMenuClick }) {
    const { user, logout } = useAuth();
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    const handleUserClick = () => {
        if (!user) {
            navigate("/auth/login");
        } else {
            setShowMenu((v) => !v);
        }
    };

    const handleLogout = () => {
        logout();
        setShowMenu(false);
        navigate("/auth/login");
    };

    return (
        <nav className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-indigo-500 to-indigo-400 p-4 shadow-md rounded-b-lg gap-4 md:gap-0 w-full">
            <div className="w-full md:w-auto flex justify-between items-center">
                <h2 className="text-white text-xl font-semibold">TBN STORE</h2>
                {/* Hamburger menu cho mobile */}
                <button className="md:hidden text-white" onClick={onMenuClick}>
                    <Menu />
                </button>
            </div>
            {/* Ẩn icon trên mobile, chỉ hiện trên md trở lên */}
            <div className="hidden md:flex flex-row items-center gap-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Type here..."
                        className="px-4 py-2 rounded-full bg-white text-sm focus:outline-none w-60"
                        onChange={e => console.log(e.target.value)}

                    />
                </div>
                <Bell className="text-white" />
                <div className="relative">
                    <button onClick={handleUserClick}>
                        <User className="text-white" />
                    </button>
                    {user && (
                        <span className="ml-2 text-white font-semibold">{user?.userName}</span>
                    )}
                    {showMenu && user && (
                        <div className="absolute right-0 mt-2 bg-white rounded shadow-lg z-50 min-w-[120px]">
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                Đăng xuất
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
