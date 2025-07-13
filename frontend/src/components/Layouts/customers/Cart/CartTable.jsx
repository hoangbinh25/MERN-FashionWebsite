// components/TableCart.jsx
import React from "react";

export default function TableCart() {
  return (
    <div className="space-y-6">
      {/* Cart Item */}
      {[1, 2].map((item, idx) => (
        <div
          key={idx}
          className="flex flex-col sm:flex-row items-center justify-between border p-4 rounded-lg shadow"
        >
          <div className="flex items-center gap-4">
            <img
              src="https://via.placeholder.com/80"
              alt="Product"
              className="w-20 h-20 object-cover rounded"
            />
            <div>
              <h2 className="text-lg font-semibold">
                {idx === 0 ? "Fresh Strawberries" : "Lightweight Jacket"}
              </h2>
              <p className="text-gray-600">
                {idx === 0 ? '36,000' : '16,000'}&nbsp;₫
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <button className="px-2 py-1 border rounded">-</button>
            <span>1</span>
            <button className="px-2 py-1 border rounded">+</button>
          </div>
          <div className="text-right">
            <p className="font-semibold">
              {idx === 0 ? '36,000' : '16,000'}&nbsp;₫
            </p>
          </div>
        </div>
      ))}

    </div>
  );
}

