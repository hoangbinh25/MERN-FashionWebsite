import { useState, useEffect } from "react";
import { getCartByUser, deleteProductFromCart, updateQuantityInCart } from "~/services/cartService";
import { useCart } from "~/context/CartContext";


export default function TableCart({ cartItems, reloadCart }) {
  const User = JSON.parse(localStorage.getItem("user"));
  const { fetchCartCount } = useCart();


  const plusChange = async (_id, quantity) => {
    try {
      await updateQuantityInCart(User._id || User.id, _id, quantity + 1);
      await fetchCartCount(); // Cập nhật số lượng giỏ hàng
      reloadCart(); // Cập nhật toàn bộ
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const minusChange = async (_id, quantity) => {
    try {
      if (quantity <= 1) {
        const confirmDelete = window.confirm("Do you want to remove this product from cart?");
        if (confirmDelete) {
          await deleteProductFromCart(User._id || User.id, _id);
          await fetchCartCount(); // Cập nhật số lượng giỏ hàng
          reloadCart();
        }
        return;
      }
      await updateQuantityInCart(User._id || User.id, _id, quantity - 1);
      await fetchCartCount(); // Cập nhật số lượng giỏ hàng
      reloadCart();
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  return (
    <div className="space-y-6">
      {cartItems.map((item) => (
        <div
          key={item._id}
          className="flex flex-col sm:flex-row items-center sm:items-stretch justify-between border p-4 rounded-lg shadow"
        >
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <img
              src={item.idProduct?.image?.[0] || "https://via.placeholder.com/80"}
              alt={item.idProduct?.nameProduct || "Product"}
              className="w-20 h-20 object-cover rounded flex-shrink-0"
            />
            <div className="min-w-0">
              <h2 className="text-lg font-semibold truncate">
                {item.idProduct?.nameProduct}
              </h2>
              <p className="text-gray-600">
                {item.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </p>
              <p className="text-gray-500 text-sm">
                Size: {item.idProduct?.size || item.size || "N/A"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 sm:mt-0 sm:mx-8">
            <button
              className="px-2 py-1 border rounded min-w-[32px]"
              onClick={() => minusChange(item.idProduct._id, item.quantity)}
            >
              -
            </button>
            <span className="min-w-[24px] text-center">{item.quantity}</span>
            <button
              className="px-2 py-1 border rounded min-w-[32px]"
              onClick={() => plusChange(item.idProduct._id, item.quantity)}
            >
              +
            </button>
          </div>
          <div className="text-right min-w-[80px]">
            <p className="font-semibold">
              {(item.price * item.quantity).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

