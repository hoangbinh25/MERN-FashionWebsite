import { Link, useLocation } from "react-router-dom";

const menuList = [
    { title: 'Home', path: '/' },
    { title: 'Shop', path: '/shop' },
    { title: 'Features', path: '/features', hot: true },
    { title: 'Blog', path: '/blog' },
    { title: 'About', path: '/about' },
    { title: 'Contact', path: '/contact' },
];

export default function Header() {
    const location = useLocation();

    return (
        <header className="w-full">
            {/* Top Bar */}
            <div className="bg-neutral-900 text-white text-sm">
                <div className="max-w-7xl mx-auto flex justify-between items-center h-9 px-4">
                    <div>
                        Free shipping for standard order over $100
                    </div>
                    <div className="flex items-center divide-x divide-gray-600">
                        <Link to="#" className="px-4 hover:underline">Help &amp; FAQs</Link>
                        <Link to="#" className="px-4 hover:underline">My Account</Link>
                        <Link to="#" className="px-4 hover:underline">EN</Link>
                        <Link to="#" className="px-4 hover:underline">USD</Link>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <div className="bg-gray-200">
                <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-4">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold tracking-wide text-gray-800">COZA</span>
                        <span className="text-2xl font-light tracking-wide text-gray-600">STORE</span>
                    </div>

                    {/* Menu */}
                    <nav className="flex-1 flex justify-center">
                        <ul className="flex space-x-7 items-center text-base font-medium">
                            {menuList.map((item) => (
                                <li key={item.title} className="relative flex items-center">
                                    <Link to={item.path}
                                        className={
                                            location.pathname === item.path
                                                ?
                                                "text-indigo-500"
                                                : "text-gray-700 hover:text-indigo-500 transition"}
                                    >
                                        {item.title}

                                    </Link>
                                    {item.hot && (
                                        <span className="ml-2 px-2 py-0.5 text-xs bg-pink-500 text-white rounded-full font-semibold absolute -top-3 left-14">HOT</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Icons */}
                    <div className="flex items-center space-x-6">
                        {/* Search Icon */}
                        <button className="relative group">
                            <svg className="w-6 h-6 text-gray-700 group-hover:text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                        </button>
                        {/* Cart Icon */}
                        <button className="relative group">
                            <svg className="w-6 h-6 text-gray-700 group-hover:text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6 6h15l-1.5 9h-13z" /><circle cx="9" cy="21" r="1" /><circle cx="19" cy="21" r="1" /></svg>
                            <span className="absolute -top-2 -right-2 bg-indigo-400 text-white text-xs font-bold px-1.5 rounded">2</span>
                        </button>
                        {/* Heart Icon */}
                        <button className="relative group">
                            <svg className="w-6 h-6 text-gray-700 group-hover:text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 21C12 21 4 13.5 4 8.5C4 5.5 6.5 3 9.5 3C11.04 3 12.5 3.99 13.07 5.36C13.64 3.99 15.1 3 16.64 3C19.64 3 22.14 5.5 22.14 8.5C22.14 13.5 14 21 14 21H12Z" /></svg>
                            <span className="absolute -top-2 -right-2 bg-indigo-400 text-white text-xs font-bold px-1.5 rounded">0</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
