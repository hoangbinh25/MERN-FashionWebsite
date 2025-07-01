import { Link, useLocation } from "react-router-dom";
import { FaRegUserCircle, FaSearch } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useEffect, useState } from "react";

const menuList = [
    { title: 'Home', path: '/' },
    { title: 'Shop', path: '/shop' },
    { title: 'Blog', path: '/blog' },
    { title: 'About', path: '/about' },
    { title: 'Contact', path: '/contact' },
];

export default function Header() {
    const location = useLocation();
    const [isFixed, setIsFixed] = useState();

    useEffect(() => {
        const handleScroll = () => {
            setIsFixed(window.scrollY > 20);
        }
        window.addEventListener("scroll", handleScroll);

        // remove 
        return () => window.removeEventListener("scroll", handleScroll)
    }, []);


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
                                    {item.hot && (
                                        <span className="ml-2 px-2 py-0.5 text-xs bg-pink-500 text-white rounded-full font-semibold absolute -top-1 left-10">HOT</span>
                                    )}
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
                        <button className="group flex items-center justify-center w-9 h-9 relative">
                            <FaRegUserCircle className="w-7 h-7 text-gray-700 group-hover:text-indigo-500 transition" />
                        </button>
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
