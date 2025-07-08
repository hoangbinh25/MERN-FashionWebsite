import React, { useState } from "react";
import { createCategory } from "~/services/categoriesService";

export default function CreateCategory({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    nameCategory: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nameCategory.trim()) {
      setError("Tên danh mục không được để trống.");
      return;
    }

    try {
      setLoading(true);
      const res = await createCategory(form);
      console.log("Tạo category thành công:", res);
      if (onSuccess) onSuccess(res.newCategory); // gửi về parent nếu cần cập nhật danh sách
      onClose();
    } catch (err) {
      console.error("Lỗi tạo category:", err);
      setError(err?.response?.data?.message || "Lỗi không xác định");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl"
          onClick={onClose}
        >
          ×
        </button>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-800">Create Category</h2>

          <div>
            <label className="text-sm font-medium text-gray-700">Category Name</label>
            <input
              type="text"
              name="nameCategory"
              value={form.nameCategory}
              onChange={handleChange}
              className="mt-1 border px-3 py-2 w-full rounded-lg focus:ring-2 focus:ring-indigo-400 text-sm"
              placeholder="input category name"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md font-semibold text-sm"
            >
              {loading ? "Đang tạo..." : "Tạo mới"}
            </button>
            <button
              type="button"
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm"
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
