// src/context/CartContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { getCartByUser } from "~/services/cartService";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?._id) {
      try {
        const res = await getCartByUser(user._id);
        const data = Array.isArray(res) ? res : [];
        const totalQuantity = data.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(totalQuantity);
      } catch (error) {
        console.error("Lỗi khi fetch giỏ hàng:", error);
      }
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, fetchCartCount }}>
      {children}
    </CartContext.Provider>
  );
}
