import React, { useState, useEffect } from "react";
import provincesData from "~/assets/64TinhThanh.json";

export default function AddressCart({ cartItems, onProceedCheckout }) {
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCommune, setSelectedCommune] = useState("");
  const [districts, setDistricts] = useState([]);
  const [communes, setCommunes] = useState([]);

  useEffect(() => {
    if (selectedProvince) {
      setDistricts(
        provincesData.district.filter(
          (d) => d.idProvince === selectedProvince
        )
      );
      setSelectedDistrict("");
      setCommunes([]);
      setSelectedCommune("");
    } else {
      setDistricts([]);
      setSelectedDistrict("");
      setCommunes([]);
      setSelectedCommune("");
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      setCommunes(
        provincesData.commune.filter(
          (c) => c.idDistrict === selectedDistrict
        )
      );
      setSelectedCommune("");
    } else {
      setCommunes([]);
      setSelectedCommune("");
    }
  }, [selectedDistrict]);

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow space-y-4">
      <h3 className="text-xl font-semibold border-b pb-2">Shipping Address</h3>

      <div className="space-y-2">
        <div>
          <label className="block text-sm font-medium text-gray-600">Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            className="w-full border px-3 py-2 rounded text-sm mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Phone Number</label>
          <input
            type="text"
            placeholder="0123 456 789"
            className="w-full border px-3 py-2 rounded text-sm mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Province / City</label>
          <select
            className="w-full border px-3 py-2 rounded text-sm mt-1"
            value={selectedProvince}
            onChange={e => setSelectedProvince(e.target.value)}
          >
            <option value="">Select Province/City</option>
            {provincesData.province.map((p) => (
              <option key={p.idProvince} value={p.idProvince}>{p.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">District</label>
          <select
            className="w-full border px-3 py-2 rounded text-sm mt-1"
            value={selectedDistrict}
            onChange={e => setSelectedDistrict(e.target.value)}
            disabled={!selectedProvince}
          >
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d.idDistrict} value={d.idDistrict}>{d.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Commune (Ward)</label>
          <select
            className="w-full border px-3 py-2 rounded text-sm mt-1"
            value={selectedCommune}
            onChange={e => setSelectedCommune(e.target.value)}
            disabled={!selectedDistrict}
          >
            <option value="">Select Commune/Ward</option>
            {communes.length > 0 ? communes.map((c, idx) => (
              <option key={idx} value={c.name}>{c.name}</option>
            )) : null}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Address (Street, Ward...)</label>
          <input
            type="text"
            placeholder="123 Nguyen Trai, Ward 5"
            className="w-full border px-3 py-2 rounded text-sm mt-1"
          />
        </div>

      </div>

      <div className="border-t pt-4 space-y-1">
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

      <button
        className="w-full mt-4 bg-black hover:bg-gray-800 text-white py-2 rounded text-center text-sm font-semibold"
        type="button"
        onClick={onProceedCheckout}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
