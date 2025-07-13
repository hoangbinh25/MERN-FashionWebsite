import {
  CalendarDays,
  CreditCard,
  LayoutDashboard,
  ShoppingCart,
  Boxes,
  User2,
  Store,
  ReceiptText,
  Bell,
  User,
  BarChart3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Aside({ show, onClose }) {
  const [collapsed, setCollapsed] = useState(false);
  const [showToggle, setShowToggle] = useState(false);

  return (
    <>
      {/* Overlay cho mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden transition-opacity ${
          show ? "block" : "hidden"
        }`}
        onClick={onClose}
      />
      <aside
        className={`
          fixed top-0 left-0 z-50 bg-white min-h-screen shadow-lg p-4 rounded-r-2xl
          transition-all duration-500
          ${show ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0 md:block
          ${collapsed ? "w-20" : "w-64"}
          ${collapsed ? "flex flex-col items-center" : ""}
        `}
        onMouseEnter={() => setShowToggle(true)}
        onMouseLeave={() => setShowToggle(false)}
        style={{
          transitionProperty: "width,transform,background-color,box-shadow",
        }}
      >
        {/* Nút ẩn/hiện chỉ hiện khi hover */}
        <div
          className={`absolute top-4 -right-4 z-50 md:block hidden transition-opacity duration-300 ${
            showToggle ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          <button
            className="bg-white border border-gray-200 rounded-full shadow p-1 hover:bg-indigo-100 transition"
            onClick={() => setCollapsed((c) => !c)}
            aria-label={collapsed ? "Mở rộng menu" : "Thu gọn menu"}
            tabIndex={showToggle ? 0 : -1}
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
        <div
          className={`text-xl font-semibold mb-6 flex items-center transition-all duration-500 ${
            collapsed ? "justify-center" : "gap-2"
          }`}
        >
          <LayoutDashboard className="text-indigo-500 transition-all duration-500" />
          <span
            className={`transition-opacity duration-500 ${
              collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
            }`}
            style={{ overflow: "hidden", display: "inline-block" }}
          >
            TBN Dashboard
          </span>
        </div>
        {/* Icon chỉ hiện trên mobile */}
        <div className="md:hidden mb-4 flex justify-center">
          <div className="flex items-center gap-8 w-full justify-center mb-4">
            <span className="p-2 rounded-full hover:bg-gray-100 transition">
              <Bell className="text-gray-700" size={28} />
            </span>
            <span className="p-2 rounded-full hover:bg-gray-100 transition">
              <User className="text-gray-700" size={28} />
            </span>
          </div>
          {/* Nút ở dưới cùng */}
          <div className="fixed bottom-6 left-0 w-64 flex flex-col gap-2 px-4 z-50">
            <button
              className="text-indigo-500 border border-indigo-500 rounded py-2"
              onClick={onClose}
            >
              Đóng
            </button>
            <button className="text-sm font-medium border border-gray-300 rounded py-2">
              Sign In
            </button>
          </div>
        </div>
        <ul className={`space-y-4 text-gray-700 ${collapsed ? "flex flex-col items-center" : ""}`}>
          <li
            className={`flex items-center hover:text-indigo-600 cursor-pointer transition-all duration-300 ${
              collapsed ? "justify-center" : "gap-2"
            }`}
          >
            <Link
              to="/admin"
              className="flex items-center w-full"
            >
              <BarChart3 className="text-green-500 transition-all duration-300" />
              <span
                className={`transition-opacity duration-500 ${
                  collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
                }`}
                style={{ overflow: "hidden", display: "inline-block" }}
              >
                DashBoard
              </span>
            </Link>
          </li>
          <li
            className={`flex items-center hover:text-indigo-600 cursor-pointer transition-all duration-300 ${
              collapsed ? "justify-center" : "gap-2"
            }`}
          >
            <Link
              to="/admin/category"
              className="flex items-center w-full"
            >
              <CalendarDays className="text-red-500 transition-all duration-300" />
              <span
                className={`transition-opacity duration-500 ${
                  collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
                }`}
                style={{ overflow: "hidden", display: "inline-block" }}
              >
                Category
              </span>
            </Link>
          </li>
          <li
            className={`flex items-center hover:text-indigo-600 cursor-pointer transition-all duration-300 ${
              collapsed ? "justify-center" : "gap-2"
            }`}
          >
            <Link
              to="/admin/product"
              className="flex items-center w-full"
            >
              <Boxes className="text-yellow-500 transition-all duration-300" />
              <span
                className={`transition-opacity duration-500 ${
                  collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
                }`}
                style={{ overflow: "hidden", display: "inline-block" }}
              >
                Product
              </span>
            </Link>
          </li>
          <li
            className={`flex items-center hover:text-indigo-600 cursor-pointer transition-all duration-300 ${
              collapsed ? "justify-center" : "gap-2"
            }`}
          >
            <Link
              to="/admin/user"
              className="flex items-center w-full"
            >
              <User2 className="text-blue-500 transition-all duration-300" />
              <span
                className={`transition-opacity duration-500 ${
                  collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
                }`}
                style={{ overflow: "hidden", display: "inline-block" }}
              >
                User
              </span>
            </Link>
          </li>
          <li
            className={`flex items-center hover:text-indigo-600 cursor-pointer transition-all duration-300 ${
              collapsed ? "justify-center" : "gap-2"
            }`}
          >
            <Link
              to="/admin/order"
              className="flex items-center w-full"
            >
              <ReceiptText className="text-purple-500 transition-all duration-300" />
              <span
                className={`transition-opacity duration-500 ${
                  collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
                }`}
                style={{ overflow: "hidden", display: "inline-block" }}
              >
                Order
              </span>
            </Link>
          </li>
          
        </ul>
      </aside>
    </>
  );
}