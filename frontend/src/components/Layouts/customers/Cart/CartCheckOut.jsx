import React, { useState } from "react";
import { redirect } from "react-router-dom";
import { deleteAllProductInCart } from "~/services/cartService";
import { createOrder } from "~/services/orderService";
import { createUser } from "~/services/usersService";
import { useCart } from "~/context/CartContext";
import { useNavigate } from "react-router-dom";

// Remove mockAddress, use addressInfo prop instead
export default function CheckOut({ addressInfo, cartItems, onCancel }) {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  console.log("cartItems Info:", cartItems);

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;
  const address = "Province / City: " + addressInfo.province + ", District: " + addressInfo.district + ", Commune (Ward): " + addressInfo.commune + ", Address (Street, Ward...): " + addressInfo.street;
  const { fetchCartCount } = useCart();
  const navigate = useNavigate();
  const User = JSON.parse(localStorage.getItem("user"));
  console.log("Cart Items:", cartItems);
  const handleCreateOrder = async () => {
    const orderData = {
      idUser: User._id || User.id,
      address: address,
      statusPayment: paymentMethod, // "cod" hoặc "qr"
      orderDetails: cartItems.map(item => ({
        idProduct: item.idProduct._id,
        quantity: item.quantity,
        price: item.price
      })),
      total: total
    };

    try {
      const result = await createOrder(orderData);
      console.log("Order created:", result);
      if (result) {
        await deleteAllProductInCart(User._id || User.id);
        await fetchCartCount();
        navigate("/successful");
      }
    } catch (error) {
      console.log("Order creation failed:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-gray-50 rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Checkout Order</h2>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Product List */}
        <div className="flex-1 md:w-1/2 border-r pr-6">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Products</h3>
            {cartItems.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-base py-3 border-b last:border-b-0">
                <span className="font-medium text-gray-700">{item.idProduct.nameProduct} <span className="text-gray-400">x{item.quantity}</span></span>
                <span className="font-semibold text-indigo-600">
                  {(item.price * item.quantity).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
            ))}
            <div className="mt-6 space-y-1">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span className="font-semibold">
                  {subtotal.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping:</span>
                <span className="font-semibold">
                  {shipping.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>
                  {total.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Address & Payment */}
        <div className="flex-1 md:w-1/2 pl-0 md:pl-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Shipping Address</h3>
            <div className="text-base space-y-2">
              <div><span className="font-medium text-gray-600">Name:</span> {addressInfo?.fullName}</div>
              <div><span className="font-medium text-gray-600">Phone:</span> {addressInfo?.phone}</div>
              <div><span className="font-medium text-gray-600">Province/City:</span> {addressInfo?.province}</div>
              <div><span className="font-medium text-gray-600">District:</span> {addressInfo?.district}</div>
              <div><span className="font-medium text-gray-600">Commune/Ward:</span> {addressInfo?.commune}</div>
              <div><span className="font-medium text-gray-600">Street:</span> {addressInfo?.street}</div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Payment</h3>
            <div className="flex gap-6 items-center mb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="accent-indigo-600"
                />
                <span className="text-gray-700">Pay on Delivery (COD)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="qr"
                  checked={paymentMethod === "qr"}
                  onChange={() => setPaymentMethod("qr")}
                  className="accent-pink-500"
                />
                <span className="text-gray-700">Bank Transfer via QR</span>
              </label>
            </div>
            {paymentMethod === "qr" && (
              <div className="mt-2 flex flex-col items-center">
                <img
                  src="https://img.vietqr.io/image/tpbank-mynamebvh-compact2.jpg?amount=&addInfo=test&accountName=Nguyen%20Thanh%20Tung"
                  alt="QR Code"
                  className="w-48 h-48 object-contain border-2 border-pink-300 rounded-xl shadow"
                />
                <span className="text-xs text-gray-500 mt-2">Scan to pay via TPBank</span>
              </div>
            )}

            <div className="flex gap-4 mt-6">
              <button
                className="w-1/2 py-3 rounded text-center text-sm font-semibold bg-gray-100 text-gray-500 hover:bg-gray-200 transition duration-200 shadow"
                type="button"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                className={`w-1/2 py-3 rounded text-center text-sm font-semibold transition duration-200 ${paymentMethod === "cod"
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                disabled={paymentMethod !== "cod"}
                onClick={handleCreateOrder}
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}