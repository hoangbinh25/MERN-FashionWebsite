import React, { useState, useEffect } from "react";
import provincesData from "~/assets/64TinhThanh.json";
import { getAddressByIdUser, createAddress, updateAddress } from "~/services/orderService";

export default function AddressCart({ cartItems, onProceedCheckout, onAddressChange }) {
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const User = JSON.parse(localStorage.getItem("user"));
  const shipping = 0;
  const total = subtotal + shipping;
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCommune, setSelectedCommune] = useState("");
  const [districts, setDistricts] = useState([]);
  const [communes, setCommunes] = useState([]);
  const [addressInfo, setAddressInfo] = useState({
    fullName: "",
    phone: "",
    province: "",
    district: "",
    commune: "",
    street: "",
  });
  const [addressDetail, setAddressDetail] = useState({
    idUser: User._id || User.id,
    province: "",
    provinceCode: 0,
    district: "",
    districtCode: 0,
    commune: "",
    communeCode: 0,
    addressDetail: ""
  });

  //lấy địa chỉ của user
  useEffect(() => {
  const fetchOrCreateAddress = async () => {
    try {
      const res = await getAddressByIdUser(User._id);
      if (res) {
        setAddressDetail(res);
        setAddressInfo({
          fullName: res.fullName || "",
          phone: res.phone || "",
          province: res.province,
          district: res.district,
          commune: res.commune,
          street: res.addressDetail
        });
        setSelectedProvince(res.provinceCode?.toString() || "");
        setSelectedDistrict(res.districtCode?.toString() || "");
        setSelectedCommune(res.communeCode?.toString() || "");
      } else {
        const created = await createAddress({
          idUser: User._id,
          province: "",
          provinceCode: 0,
          district: "",
          districtCode: 0,
          commune: "",
          communeCode: 0,
          addressDetail: ""
        });
        setAddressDetail(created);
      }
    } catch (error) {
      console.error("Error fetching/creating address:", error);
    }
  };

  fetchOrCreateAddress();
}, []);

//lưu địa chỉ khi thay đổi
useEffect(() => {
  const timeout = setTimeout(() => {
    if (addressDetail?._id) {
      updateAddress(addressDetail._id, {
        ...addressDetail,
        province: addressInfo.province,
        district: addressInfo.district,
        commune: addressInfo.commune,
        provinceCode: parseInt(selectedProvince) || 0,
        districtCode: parseInt(selectedDistrict) || 0,
        communeCode: communes.find(c => c.name === selectedCommune)?.idCommune || 0,
        addressDetail: addressInfo.street,
        fullName: addressInfo.fullName,
        phone: addressInfo.phone
      });
    }
  }, 1000); // 1s sau khi dừng nhập

  return () => clearTimeout(timeout);
}, [addressInfo, selectedProvince, selectedDistrict, selectedCommune]);


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

  const handleChange = (field, value) => {
    setAddressInfo(prev => ({ ...prev, [field]: value }));
    if (onAddressChange) onAddressChange({ ...addressInfo, [field]: value });
  };

  const handleProceed = () => {
    if (onProceedCheckout) onProceedCheckout(addressInfo);
  };

  const isValidPhone = /^0\d{9,10}$/.test(addressInfo.phone);
  const isValidFullName = addressInfo.fullName.trim().split(/\s+/).length >= 2;

  const isAddressComplete =
    Object.values(addressInfo).every(val => val && val.trim() !== "") &&
    isValidPhone &&
    isValidFullName;

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow space-y-4">
      <h3 className="text-xl font-semibold border-b pb-2">Shipping Address</h3>

      <div className="space-y-2">
        <div>
          <label className="block text-sm font-medium text-gray-600">Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            className={`w-full border px-3 py-2 rounded text-sm mt-1 ${addressInfo.fullName && !isValidFullName ? "border-red-500" : ""}`}
            onChange={e => handleChange("fullName", e.target.value)}
          />
          {addressInfo.fullName && !isValidFullName && (
            <span className="text-xs text-red-500">
              Full name must be at least 2 words.
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Phone Number</label>
          <input
            type="text"
            placeholder="0123 456 789"
            className={`w-full border px-3 py-2 rounded text-sm mt-1 ${addressInfo.phone && !isValidPhone ? "border-red-500" : ""}`}
            onChange={e => handleChange("phone", e.target.value)}
          />
          {addressInfo.phone && !isValidPhone && (
            <span className="text-xs text-red-500">Invalid phone number. Please enter a valid format (10-11 digits, starting with 0).</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Province / City</label>
          <select
            className="w-full border px-3 py-2 rounded text-sm mt-1"
            value={selectedProvince}
            onChange={e => {
              const selectedId = e.target.value;
              const selectedName = provincesData.province.find(p => p.idProvince === selectedId)?.name || "";
              setSelectedProvince(selectedId);
              handleChange("province", selectedName);
            }}
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
            onChange={e => {
              const selectedId = e.target.value;
              const selectedName = districts.find(d => d.idDistrict === selectedId)?.name || "";
              setSelectedDistrict(selectedId);
              handleChange("district", selectedName);
            }}
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
            onChange={e => {
              setSelectedCommune(e.target.value);
              handleChange("commune", e.target.value);
            }}
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
            onChange={e => handleChange("street", e.target.value)}
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
        className={`w-full mt-4 bg-black hover:bg-gray-800 text-white py-2 rounded text-center text-sm font-semibold ${!isAddressComplete ? "opacity-50 cursor-not-allowed" : ""}`}
        type="button"
        onClick={handleProceed}
        disabled={!isAddressComplete}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
