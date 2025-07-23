
import React, { useState } from "react";
import { updateUser } from "~/services/usersService";

export default function UserDetail({ user, onClose, onSave }) {
  const emptyForm = {
    _id: "",
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: false,
    isActive: false,
    createdAt: "",
  };
  const [form, setForm] = useState(user ? {
    _id: user._id || "",
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    userName: user.userName || "",
    email: user.email || "",
    password: "",
    phone: user.phone || "",
    address: user.address || "",
    role: user.role ?? false,
    isActive: user.isActive ?? false,
    createdAt: user.createdAt || "",
  } : emptyForm);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Gửi dữ liệu cập nhật lên backend
      const updateData = {
        firstName: form.firstName,
        lastName: form.lastName,
        userName: form.userName,
        email: form.email,
        password: form.password ? form.password : undefined,
        phone: form.phone,
        address: form.address,
        role: form.role,
        isActive: form.isActive,
      };
      await updateUser(form._id, updateData);
      if (onSave) onSave();

      onClose();
    } catch (err) {
      setError("Update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4 sm:px-0">
      <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 w-full max-w-md sm:max-w-4xl relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-xl sm:text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 sm:gap-6"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">User Details</h2>
          {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs sm:text-sm font-semibold text-gray-600">ID</label>
              <input
                type="text"
                name="_id"
                value={form._id}
                disabled
                className="border rounded px-2 sm:px-3 py-1.5 sm:py-2 w-full bg-gray-100 mt-1 text-sm"
              />
            </div>
            <div>
              <label className="text-xs sm:text-sm font-semibold text-gray-600">First Name</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="border rounded px-2 sm:px-3 py-1.5 sm:py-2 w-full focus:ring-2 focus:ring-indigo-400 mt-1 text-sm"
                required
              />
            </div>
            <div>
              <label className="text-xs sm:text-sm font-semibold text-gray-600">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="border rounded px-2 sm:px-3 py-1.5 sm:py-2 w-full focus:ring-2 focus:ring-indigo-400 mt-1 text-sm"
                required
              />
            </div>
            <div>
              <label className="text-xs sm:text-sm font-semibold text-gray-600">Username</label>
              <input
                type="text"
                name="userName"
                value={form.userName}
                onChange={handleChange}
                className="border rounded px-2 sm:px-3 py-1.5 sm:py-2 w-full focus:ring-2 focus:ring-indigo-400 mt-1 text-sm"
                required
              />
            </div>
            <div>
              <label className="text-xs sm:text-sm font-semibold text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="border rounded px-2 sm:px-3 py-1.5 sm:py-2 w-full focus:ring-2 focus:ring-indigo-400 mt-1 text-sm"
                placeholder="Leave blank to keep current password"
              />
            </div>
            <div>
              <label className="text-xs sm:text-sm font-semibold text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="border rounded px-2 sm:px-3 py-1.5 sm:py-2 w-full focus:ring-2 focus:ring-indigo-400 mt-1 text-sm"
                required
              />
            </div>
            <div>
              <label className="text-xs sm:text-sm font-semibold text-gray-600">Role</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="border rounded px-2 sm:px-3 py-1.5 sm:py-2 w-full focus:ring-2 focus:ring-indigo-400 mt-1 text-sm"
                required
              >
                <option value={true}>Admin</option>
                <option value={false}>Customer</option>
              </select>
            </div>
            <div>
              <label className="text-xs sm:text-sm font-semibold text-gray-600">Phone</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="border rounded px-2 sm:px-3 py-1.5 sm:py-2 w-full focus:ring-2 focus:ring-indigo-400 mt-1 text-sm"
              />
            </div>
            <div>
              <label className="text-xs sm:text-sm font-semibold text-gray-600">Address</label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="border rounded px-2 sm:px-3 py-1.5 sm:py-2 w-full focus:ring-2 focus:ring-indigo-400 mt-1 text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isActive"
                checked={form.isActive}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-400 border-gray-300 rounded"
              />
              <label className="text-xs sm:text-sm font-semibold text-gray-600">Enable User</label>
            </div>
            <div>
              <label className="text-xs sm:text-sm font-semibold text-gray-600">Created At</label>
              <input
                type="text"
                name="createdAt"
                value={form.createdAt ? new Date(form.createdAt).toLocaleString() : ""}
                disabled
                className="border rounded px-2 sm:px-3 py-1.5 sm:py-2 w-full bg-gray-100 mt-1 text-sm"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg font-semibold shadow text-sm"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg font-semibold text-sm"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}