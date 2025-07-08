import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegUserCircle, FaSearch } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";

const menuList = [
    { title: 'Home', path: '/home' },
    { title: 'Shop', path: '/shop' },
    { title: 'Blog', path: '/blog' },
    { title: 'About', path: '/about' },
    { title: 'Contact', path: '/contact' },
];

export default function Header() {
    const location = useLocation();
    const [isFixed, setIsFixed] = useState(false);
    const [user, setUser] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef()
    const navigate = useNavigate()

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData && userData !== "undefined") {
            try {
                setUser(JSON.parse(userData));
            } catch (e) {
                setUser(null);
                localStorage.removeItem("user"); // Xóa giá trị lỗi để tránh lặp lại
            }
        }
    }, []);

    // Dropdown when user login
    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropdown(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // Event Scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsFixed(window.scrollY > 20);
        }
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll)
    }, []);

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("user")
        setUser(null)
        navigate("/login")
    }

    return (
        <header className={`w-full transition-all duration-500 ${isFixed ? "fixed top-0 left-0 z-50 bg-white shadow" : ""}`}>

            {/* Main Navbar */}
            <div className={`bg-[#f3f1ef] ${isFixed ? "bg-white shadow" : ""}`}>
                <div className="max-w-screen-2xl mx-auto flex items-center justify-between h-20 px-4">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold tracking-wide text-gray-800">TBN</span>
                        <span className="text-2xl font-light tracking-wide text-gray-600">STORE</span>
                    </div>

                    {/* Menu */}
                    <nav className="flex-1 justify-center hidden md:flex">
                        <ul className="flex space-x-7 items-center text-base font-medium">
                            {menuList.map((item) => (
                                <li key={item.title} className="relative flex items-center p-2">
                                    <Link to={item.path}
                                        className={
                                            location.pathname === item.path
                                                ?
                                                "text-indigo-500 text-2xl p-2"
                                                : "text-gray-700 hover:text-indigo-500 transition p-2"}
                                    >
                                        {item.title}

                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Icons */}
                    <div className="flex items-center space-x-6">
                        {/* Search Icon */}
                        <button className="group flex items-center justify-center w-9 h-9 relative">
                            <FaSearch className="w-7 h-7 text-gray-700 group-hover:text-indigo-500 transition" />
                        </button>
                        {/* Cart Icon */}
                        <button className="group flex items-center justify-center w-9 h-9 relative">
                            <FaCartShopping className="w-7 h-7 text-gray-700 group-hover:text-indigo-500 transition" />
                            <span className="absolute -top-1.5 -right-1 bg-indigo-400 text-white text-xs font-bold px-1.5 rounded-full">2</span>
                        </button>
                        {/* User Icon */}
                        {user ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    className="flex items-center space-x-2"
                                    onClick={() => setShowDropdown((prev) => !prev)}
                                >
                                    <FaRegUserCircle className="w-7 h-7 text-gray-700" />
                                    <span className="font-medium">{user.userName || user.email}</span>
                                </button>
                                {showDropdown && (
                                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-50">
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 hover:bg-gray-100"
                                            onClick={() => setShowDropdown(false)}
                                        >
                                            Xem hồ sơ
                                        </Link>
                                        <button
                                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                            onClick={handleLogout}
                                        >
                                            Đăng xuất
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login" className="group flex items-center justify-center w-9 h-9 relative">
                                <FaRegUserCircle className="w-7 h-7 text-gray-700 group-hover:text-indigo-500 transition" />
                            </Link>
                        )}
                        {/* Hamburger - chỉ hiện mobile */}
                        <button className="ml-2 flex flex-col justify-center items-center w-9 h-9 md:hidden">
                            <span className="block w-7 h-1 bg-gray-700 mb-1 rounded"></span>
                            <span className="block w-7 h-1 bg-gray-700 mb-1 rounded"></span>
                            <span className="block w-7 h-1 bg-gray-700 rounded"></span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
