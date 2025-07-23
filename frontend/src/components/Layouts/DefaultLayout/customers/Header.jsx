import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegUserCircle, FaSearch } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "~/context/AuthContext";
import { useCart } from "~/context/CartContext";


const menuList = [
    { title: 'Trang chủ', path: '/user/home' },
    { title: 'Sản phẩm', path: '/user/shop' },
    { title: 'Bài viết', path: '/user/blog' },
    { title: 'Về chúng tôi', path: '/user/about' },
    { title: 'Liên hê', path: '/user/contact' }

];

export default function Header() {
    const location = useLocation();
    const [isFixed, setIsFixed] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { user, logout } = useAuth();
    const { cartCount } = useCart();

    const dropdownRef = useRef();
    const searchRef = useRef();
    const searchInputRef = useRef();
    const navigate = useNavigate();

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

    // Focus input Search
    useEffect(() => {
        if (showSearch && searchInputRef) {
            searchInputRef.current.focus();
        }
    }, [showSearch])

    // Event Scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsFixed(window.scrollY > 20);
        }
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll)
    }, []);

    useEffect(() => {
        function handleClickOutside(e) {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowSearch(false);  // Đóng khi click bên ngoài
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            console.log('Search for: ', searchQuery);
            setShowSearch();
            setSearchQuery("");

        }
    }

    const handleSearchIconClick = () => {
        setShowSearch(!showSearch);
        if (!showSearch) {
            setSearchQuery("");
        }
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
                        {/* Search Section */}
                        <div className="relative" ref={searchRef}>
                            {/* Search Icon */}
                            <button
                                className="group flex items-center justify-center w-9 h-9 relative"
                                onClick={handleSearchIconClick}
                            >
                                <FaSearch className={`w-7 h-7 transition ${showSearch ? 'text-indigo-500' : 'text-gray-700 group-hover:text-indigo-500'}`} />
                            </button>

                            {/* Search Input - Xuất hiện bên dưới icon */}
                            {showSearch && (
                                <div className="absolute -top-1/4 right-9 mt-2 z-50">
                                    <form onSubmit={handleSearch} className="flex items-center shadow-lg">
                                        <input
                                            ref={searchInputRef}
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Tìm kiếm sản phẩm..."
                                            className="w-60 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                                        />
                                    </form>
                                </div>
                            )}
                        </div>
                        {/* Cart Icon */}
                        <Link to="/user/cart" className="group flex items-center justify-center w-9 h-9 relative">
                            <FaCartShopping className="w-7 h-7 text-gray-700 group-hover:text-indigo-500 transition" />
                            <span className="absolute -top-1.5 -right-1 bg-indigo-400 text-white text-xs font-bold px-1.5 rounded-full cart-count">{cartCount}</span>
                        </Link>
                        {/* User Icon */}
                        {user ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    className="flex items-center space-x-2"
                                    onClick={() => setShowDropdown((prev) => !prev)}
                                >
                                    <FaRegUserCircle className="w-7 h-7 text-gray-700" />
                                    <span className="font-medium">
                                        {user?.userName || user?.firstName || user?.email || "Account"}
                                    </span>
                                </button>
                                {showDropdown && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow z-50">
                                        <Link
                                            to="/user/order"
                                            className="block px-4 py-2 hover:bg-gray-100"
                                            onClick={() => setShowDropdown(false)}
                                        >
                                            Lịch sử đơn hàng
                                        </Link>
                                        <Link
                                            to="/user/profile"
                                            className="block px-4 py-2 hover:bg-gray-100"
                                            onClick={() => setShowDropdown(false)}
                                        >
                                            Xem hồ sơ
                                        </Link>
                                        <button
                                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                            onClick={() => {
                                                logout();
                                                navigate("/auth/login")
                                            }}>
                                            Đăng xuất
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/auth/login" className="group flex items-center justify-center w-9 h-9 relative">
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
