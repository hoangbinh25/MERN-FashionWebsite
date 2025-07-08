import { useState } from "react";
import { Bell, User, Menu } from "lucide-react";

export default function Nav({ onMenuClick }) {
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
                    />
                </div>
                <button className="text-white text-sm font-medium">Sign In</button>
                <Bell className="text-white" />
                <User className="text-white" />
            </div>
        </nav>
    );
}
