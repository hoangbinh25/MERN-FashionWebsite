import React, { useState } from "react";

export default function UserDetail({ user, onClose, onSave }) {
  const [form, setForm] = useState(
    user
      ? {
          idUser: user.idUser,
          name: user.name,
          username: user.username,
          password: user.password,
          email: user.email,
          role: user.role,
          phone: user.phone,
          address: user.address,
          enableUser: user.enableUser,
          createdAt: user.createdAt,
        }
      : {}
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave({ ...user, ...form });
    onClose();
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs sm:text-sm font-semibold text-gray-600">ID</label>
              <input
                type="text"
                name="idUser"
                value={form.idUser}
                disabled
                className="border rounded px-2 sm:px-3 py-1.5 sm:py-2 w-full bg-gray-100 mt-1 text-sm"
              />
            </div>
            <div>
              <label className="text-xs sm:text-sm font-semibold text-gray-600">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="border rounded px-2 sm:px-3 py-1.5 sm:py-2 w-full focus:ring-2 focus:ring-indigo-400 mt-1 text-sm"
                required
              />
            </div>
            <div>
              <label className="text-xs sm:text-sm font-semibold text-gray-600">Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
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
                required
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
                <option value="Admin">Admin</option>
                <option value="Customer">Customer</option>
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
                required
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
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="enableUser"
                checked={form.enableUser}
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
                value={new Date(form.createdAt).toLocaleString()}
                disabled
                className="border rounded px-2 sm:px-3 py-1.5 sm:py-2 w-full bg-gray-100 mt-1 text-sm"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg font-semibold shadow text-sm"
            >
              Save
            </button>
            <button
              type="button"
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg font-semibold text-sm"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}