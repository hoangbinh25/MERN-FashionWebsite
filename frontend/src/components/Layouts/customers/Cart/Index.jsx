import AddressCart from "./CartAddress";
import CartTable from "./CartTable";
import CheckOut from "./CartCheckOut";
import React, { useState, useEffect } from "react";
import { getCartByUser } from "~/services/cartService";

export default function CartPage() {
  const [showCheckout, setShowCheckout] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [addressInfo, setAddressInfo] = useState(null);

  const User = JSON.parse(localStorage.getItem("user"));

  const loadCart = async () => {
    try {
      const data = await getCartByUser(User._id || User.id);
      console.log("Cart items loaded:", data);
      setCartItems(data);
    } catch (err) {
      console.error("Failed to load cart:", err);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-10 px-2 md:px-4">
      {showCheckout ? (
        <CheckOut 
          addressInfo={addressInfo} 
          cartItems={cartItems} 
          onCancel={() => setShowCheckout(false)} />
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 md:w-2/3">
            <CartTable cartItems={cartItems} reloadCart={loadCart} />
          </div>
          <div className="w-full md:w-1/3 md:max-w-xs lg:max-w-sm">
            <AddressCart 
            cartItems={cartItems} 
            onProceedCheckout={(info) => {
              setShowCheckout(true);
              setAddressInfo(info);
              console.log("Address Info:", info);
            }} />
          </div>
        </div>
      )}
    </div>
  );
}
