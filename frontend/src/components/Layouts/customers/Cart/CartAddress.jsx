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
  const [addressDetail, setAddressDetail] = useState(null);
  const [isNewAddress, setIsNewAddress] = useState(false);

  // Load địa chỉ của user khi component mount
  useEffect(() => {
    const fetchOrCreateAddress = async () => {
      try {
        console.log("🔍 Fetching address for user:", User._id || User.id);
        const res = await getAddressByIdUser(User._id);
        console.log("📦 Address response:", res);

        // Kiểm tra nếu có địa chỉ
        if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
          const addressData = res.data[0];
          console.log("✅ Existing address found:", addressData);
          setIsNewAddress(false);

          // Set address detail
          setAddressDetail(addressData);

          // Set address info for form
          setAddressInfo({
            fullName: addressData.fullName || "",
            phone: addressData.phone || "",
            province: addressData.province || "",
            district: addressData.district || "",
            commune: addressData.commune || "",
            street: addressData.addressDetail || "",
          });

          // Load địa chỉ theo thứ tự: Province -> District -> Commune
          loadAddressData(addressData);

        } else {
          // Nếu chưa có địa chỉ
          console.log("❌ No address found for user");
          setIsNewAddress(true);
        }
      } catch (error) {
        console.error("❌ Error fetching address:", error);
        setIsNewAddress(true);
      }
    };

    // Function để load địa chỉ theo thứ tự
    const loadAddressData = (addressData) => {
      // 1. Tìm và set province
      const foundProvince = provincesData.province.find(p =>
        p.name === addressData.province || p.idProvince === addressData.provinceCode?.toString()
      );

      console.log("🔍 Looking for province:", addressData.province, "or code:", addressData.provinceCode);
      console.log("📍 Found province:", foundProvince);

      if (foundProvince) {
        setSelectedProvince(foundProvince.idProvince);

        // 2. Load districts for province
        const provinceDistricts = provincesData.district.filter(
          (d) => d.idProvince === foundProvince.idProvince
        );
        console.log("🏘️ Available districts for province:", provinceDistricts);
        setDistricts(provinceDistricts);

        // 3. Tìm và set district
        const foundDistrict = provinceDistricts.find(d =>
          d.name === addressData.district || d.idDistrict === addressData.districtCode?.toString()
        );

        console.log("🔍 Looking for district:", addressData.district, "or code:", addressData.districtCode);
        console.log("🏘️ Found district:", foundDistrict);

        if (foundDistrict) {
          setSelectedDistrict(foundDistrict.idDistrict);

          // 4. Load communes for district
          const districtCommunes = provincesData.commune.filter(
            (c) => c.idDistrict === foundDistrict.idDistrict
          );
          console.log("🏠 Available communes for district:", districtCommunes);
          setCommunes(districtCommunes);

          // 5. Set commune
          console.log("🔍 Looking for commune:", addressData.commune);
          setSelectedCommune(addressData.commune || "");
        } else {
          console.warn("❌ District not found:", addressData.district, addressData.districtCode);
          // Reset nếu không tìm thấy district
          setSelectedDistrict("");
          setCommunes([]);
          setSelectedCommune("");
        }
      } else {
        console.warn("❌ Province not found:", addressData.province, addressData.provinceCode);
        // Reset nếu không tìm thấy province
        setSelectedProvince("");
        setDistricts([]);
        setSelectedDistrict("");
        setCommunes([]);
        setSelectedCommune("");
      }
    };

    if (User._id) {
      fetchOrCreateAddress();
    }
  }, [User._id]);

  // Handle province change (manual)
  useEffect(() => {
    if (selectedProvince && !addressDetail) {
      const provinceDistricts = provincesData.district.filter(
        (d) => d.idProvince === selectedProvince
      );
      setDistricts(provinceDistricts);
      setSelectedDistrict("");
      setCommunes([]);
      setSelectedCommune("");
    }
  }, [selectedProvince]);

  // Handle district change (manual)
  useEffect(() => {
    if (selectedDistrict && !addressDetail) {
      const districtCommunes = provincesData.commune.filter(
        (c) => c.idDistrict === selectedDistrict
      );
      setCommunes(districtCommunes);
      setSelectedCommune("");
    }
  }, [selectedDistrict]);

  const handleChange = (field, value) => {
    setAddressInfo(prev => ({ ...prev, [field]: value }));
    if (onAddressChange) onAddressChange({ ...addressInfo, [field]: value });
  };

  const handleProvinceChange = (e) => {
    const selectedId = e.target.value;
    const selectedName = provincesData.province.find(p => p.idProvince === selectedId)?.name || "";
    setSelectedProvince(selectedId);
    handleChange("province", selectedName);

    // Load districts và reset selections
    const provinceDistricts = provincesData.district.filter(
      (d) => d.idProvince === selectedId
    );
    setDistricts(provinceDistricts);
    setSelectedDistrict("");
    setCommunes([]);
    setSelectedCommune("");
  };

  const handleDistrictChange = (e) => {
    const selectedId = e.target.value;
    const selectedName = districts.find(d => d.idDistrict === selectedId)?.name || "";
    setSelectedDistrict(selectedId);
    handleChange("district", selectedName);

    // Load communes và reset selection
    const districtCommunes = provincesData.commune.filter(
      (c) => c.idDistrict === selectedId
    );
    setCommunes(districtCommunes);
    setSelectedCommune("");
  };

  const handleCommuneChange = (e) => {
    setSelectedCommune(e.target.value);
    handleChange("commune", e.target.value);
  };

  const handleProceed = async () => {
    try {
      // Tạo payload với thông tin địa chỉ mới
      const addressPayload = {
        idUser: User._id,
        fullName: addressInfo.fullName,
        phone: addressInfo.phone,
        province: addressInfo.province,
        provinceCode: parseInt(selectedProvince) || 0,
        district: addressInfo.district,
        districtCode: parseInt(selectedDistrict) || 0,
        commune: addressInfo.commune,
        communeCode: communes.find(c => c.name === selectedCommune)?.idCommune || 0,
        addressDetail: addressInfo.street
      };

      console.log("💾 Address payload:", addressPayload);
      console.log("🔍 Current addressDetail:", addressDetail);

      let result;

      // Kiểm tra có địa chỉ để update hay tạo mới
      if (addressDetail?._id) {
        // CẬP NHẬT địa chỉ có sẵn
        console.log("🔄 UPDATING existing address with ID:", addressDetail._id);
        result = await updateAddress(addressDetail._id, addressPayload);
        console.log("✅ Address updated successfully:", result);
      } else {
        // TẠO MỚI địa chỉ
        console.log("🆕 CREATING new address for user");
        result = await createAddress(addressPayload);
        console.log("✅ New address created successfully:", result);

        if (result && result.data) {
          setAddressDetail(result.data);
          setIsNewAddress(false);
        }
      }

      // Sau khi lưu thành công thì proceed checkout
      if (onProceedCheckout) {
        onProceedCheckout(addressInfo);
      }

    } catch (error) {
      console.error("❌ Failed to save address:", error);
      alert("Không thể lưu địa chỉ. Vui lòng thử lại!");
    }
  };

  const isValidPhone = /^0\d{9,10}$/.test(addressInfo.phone);
  const isValidFullName = addressInfo.fullName.trim().split(/\s+/).length >= 2;

  const isAddressComplete =
    Object.values(addressInfo).every(val => val && val.trim() !== "") &&
    isValidPhone &&
    isValidFullName &&
    selectedProvince &&
    selectedDistrict &&
    selectedCommune;

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow space-y-4">
      <div className="flex justify-between items-center border-b pb-2">
        <h3 className="text-xl font-semibold">Địa chỉ giao hàng</h3>
      </div>

      <div className="space-y-2">
        <div>
          <label className="block text-sm font-medium text-gray-600">Tên đầy đủ</label>
          <input
            type="text"
            placeholder="John Doe"
            value={addressInfo.fullName}
            className={`w-full border px-3 py-2 rounded text-sm mt-1 ${addressInfo.fullName && !isValidFullName ? "border-red-500" : ""}`}
            onChange={e => handleChange("fullName", e.target.value)}
          />
          {addressInfo.fullName && !isValidFullName && (
            <span className="text-xs text-red-500">
              Tên đầy đủ phải có ít nhất 2 từ.
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Số điện thoại</label>
          <input
            type="text"
            placeholder="0123 456 789"
            value={addressInfo.phone}
            className={`w-full border px-3 py-2 rounded text-sm mt-1 ${addressInfo.phone && !isValidPhone ? "border-red-500" : ""}`}
            onChange={e => handleChange("phone", e.target.value)}
          />
          {addressInfo.phone && !isValidPhone && (
            <span className="text-xs text-red-500">Số điện thoại không hợp lệ. Vui lòng nhập đúng định dạng (10-11 chữ số, bắt đầu bằng 0).</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Tỉnh / Thành phố</label>
          <select
            className="w-full border px-3 py-2 rounded text-sm mt-1"
            value={selectedProvince}
            onChange={handleProvinceChange}
          >
            <option value="">Chọn Tỉnh/Thành phố</option>
            {provincesData.province.map((p) => (
              <option key={p.idProvince} value={p.idProvince}>{p.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Quận / Huyện</label>
          <select
            className="w-full border px-3 py-2 rounded text-sm mt-1"
            value={selectedDistrict}
            onChange={handleDistrictChange}
            disabled={!selectedProvince}
          >
            <option value="">Chọn Quận/Huyện</option>
            {districts.map((d) => (
              <option key={d.idDistrict} value={d.idDistrict}>{d.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Xã / Phường</label>
          <select
            className="w-full border px-3 py-2 rounded text-sm mt-1"
            value={selectedCommune}
            onChange={handleCommuneChange}
            disabled={!selectedDistrict}
          >
            <option value="">Chọn Xã/Phường</option>
            {communes.length > 0 ? communes.map((c, idx) => (
              <option key={idx} value={c.name}>{c.name}</option>
            )) : null}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Địa chỉ (Đường, Phường...)</label>
          <input
            type="text"
            placeholder="123 Nguyễn Trãi, Phường 5"
            value={addressInfo.street}
            className="w-full border px-3 py-2 rounded text-sm mt-1"
            onChange={e => handleChange("street", e.target.value)}
          />
        </div>
      </div>

      <div className="border-t pt-4 space-y-1">
        <div className="flex justify-between text-lg font-bold">
          <span>Tổng tiền:</span>
          <span>
            {total.toLocaleString("vi-VN", { style: "currency", currency: "VND", minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </span>
        </div>
      </div>

      <button
        className={`w-full mt-4 bg-black hover:bg-gray-800 text-white py-2 rounded text-center text-sm font-semibold ${!isAddressComplete ? "opacity-50 cursor-not-allowed" : ""}`}
        type="button"
        onClick={handleProceed}
        disabled={!isAddressComplete}
      >
        {addressDetail?._id ? 'Tiến hành thanh toán' : 'Tiến hành thanh toán'}
      </button>
    </div>
  );
}
