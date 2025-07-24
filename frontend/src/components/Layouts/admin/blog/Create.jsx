import React, { useState } from "react";
import { createBlog } from "~/services/blogService";

export default function CreateBlog({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    titleBlog: "",
    descBlog: "",
    image: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setForm((prev) => ({
        ...prev,
        [name]: file
      }));
      if (file) {
        setPreview(URL.createObjectURL(file));
      } else {
        setPreview("");
      }
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.titleBlog.trim()) {
      setError("Tiêu đề không được để trống");
      return;
    }

    if (!form.descBlog.trim()) {
      setError("Mô tả không được để trống");
      return;
    }

    if (!form.image) {
      setError("Ảnh không được để trống");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("titleBlog", form.titleBlog);
      formData.append("descBlog", form.descBlog);
      formData.append("image", form.image);
      const res = await createBlog(formData);
      if (onSuccess) onSuccess(res.newBlog);
      onSave();
    } catch (err) {
      setError(err?.response?.data?.message || "Unknown error");
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
          <h2 className="text-xl font-semibold text-gray-800">Thêm Blog</h2>

          <div>
            <label className="text-sm font-medium text-gray-700">Tiêu đề</label>
            <input
              type="text"
              name="titleBlog"
              value={form.titleBlog}
              onChange={handleChange}
              className="mt-1 border px-3 py-2 w-full rounded-lg focus:ring-2 focus:ring-indigo-400 text-sm"
              placeholder="Title blog"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Mô tả</label>
            <textarea
              type="text"
              name="descBlog"
              value={form.descBlog}
              onChange={handleChange}
              className="mt-1 border px-3 py-2 w-full rounded-lg focus:ring-2 focus:ring-indigo-400 text-sm"
              placeholder="Mô tả"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Ảnh blog</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="mt-1 border px-3 py-2 w-full rounded-lg focus:ring-2 focus:ring-indigo-400 text-sm"
              placeholder="Ảnh"
              required
            />
            {preview && (
              <div className="mt-2 flex justify-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded-lg border"
                />
              </div>
            )}
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
              Đóng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
