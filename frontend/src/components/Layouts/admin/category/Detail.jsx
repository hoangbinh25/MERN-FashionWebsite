import React, { useState } from "react";
import { updateCategory } from "~/services/categoriesService";

export default function Detail({ category, onClose, onSave }) {
  const [form, setForm] = useState(
    category
      ? {
        _id: category._id,
        nameCategory: category.nameCategory,
      }
      : { _id: "", nameCategory: "" }
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await updateCategory(form._id, { nameCategory: form.nameCategory });
      if (onSave) onSave(res); // Gọi callback để reload danh sách
      onClose();
    } catch (err) {
      console.error("Update category failed:", err);
      setError(err?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4 sm:px-0">
      <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 w-full max-w-md sm:max-w-2xl relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-xl sm:text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-6">
          <h2 className="text-xl font-semibold text-gray-800">Cập nhật danh mục</h2>

          <div>
            <label className="text-sm text-gray-600">ID</label>
            <input
              type="text"
              name="_id"
              value={form._id}
              onChange={e => console.log(e.target.value)}
              disabled
              className="mt-1 border rounded px-3 py-2 w-full bg-gray-100 text-sm"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Tên</label>
            <input
              type="text"
              name="nameCategory"
              value={form.nameCategory}
              onChange={handleChange}
              className="mt-1 border rounded px-3 py-2 w-full text-sm focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-semibold"
              disabled={loading}
            >
              {loading ? "Cập nhật..." : "Cập nhật"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-lg text-sm font-semibold"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
