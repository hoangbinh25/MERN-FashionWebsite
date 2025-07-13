import React, { useState } from "react";

const mockCart = [
  { name: "Fresh Strawberries", qty: 1, price: 36000 },
  { name: "Lightweight Jacket", qty: 1, price: 16000 },
];
const subtotal = mockCart.reduce((sum, item) => sum + item.price * item.qty, 0);
const shipping = 5000;
const total = subtotal + shipping;

const mockAddress = {
  fullName: "John Doe",
  phone: "0123 456 789",
  province: "Thành phố Hà Nội",
  district: "Quận Ba Đình",
  commune: "Phường Kim Mã",
  street: "123 Nguyen Trai, Ward 5"
};

export default function CheckOut({ onCancel }) {
  const [paymentMethod, setPaymentMethod] = useState("cod");

  return (
    <div className="max-w-5xl mx-auto bg-gray-50 rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Checkout Order</h2>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Product List */}
        <div className="flex-1 md:w-1/2 border-r pr-6">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Products</h3>
            {mockCart.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-base py-3 border-b last:border-b-0">
                <span className="font-medium text-gray-700">{item.name} <span className="text-gray-400">x{item.qty}</span></span>
                <span className="font-semibold text-indigo-600">{item.price.toLocaleString()}&nbsp;₫</span>
              </div>
            ))}
            <div className="mt-6 space-y-1">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span className="font-semibold">{subtotal.toLocaleString()}&nbsp;₫</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping:</span>
                <span className="font-semibold">{shipping.toLocaleString()}&nbsp;₫</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>{total.toLocaleString()}&nbsp;₫</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Address & Payment */}
        <div className="flex-1 md:w-1/2 pl-0 md:pl-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Shipping Address</h3>
            <div className="text-base space-y-2">
              <div><span className="font-medium text-gray-600">Name:</span> {mockAddress.fullName}</div>
              <div><span className="font-medium text-gray-600">Phone:</span> {mockAddress.phone}</div>
              <div><span className="font-medium text-gray-600">Province/City:</span> {mockAddress.province}</div>
              <div><span className="font-medium text-gray-600">District:</span> {mockAddress.district}</div>
              <div><span className="font-medium text-gray-600">Commune/Ward:</span> {mockAddress.commune}</div>
              <div><span className="font-medium text-gray-600">Street:</span> {mockAddress.street}</div>
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