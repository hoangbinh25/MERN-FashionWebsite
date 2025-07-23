import React, { useState, useEffect } from "react";
import { getBlogById, updateBlog } from "~/services/blogService";

export default function BlogDetail({ blog, onClose, onSave }) {
  const [form, setForm] = useState({
    _id: blog?._id || "",
    titleBlog: blog?.titleBlog || "",
    descBlog: blog?.descBlog || "",
    image: blog?.image || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(blog?.image || "");

  useEffect(() => {
    if (blog && (!blog.titleBlog || !blog.descBlog || !blog.image)) {
      getBlogById(blog._id).then((data) => {
        setForm({
          _id: data._id,
          titleBlog: data.titleBlog,
          descBlog: data.descBlog,
          image: data.image,
        });
        setPreview(data.image);
      });
    }
  }, [blog]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setForm((prev) => ({
        ...prev,
        image: file
      }));
      if (file) {
        setPreview(URL.createObjectURL(file));
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
      setError("Blog title cannot be blank");
      return;
    }
    if (!form.descBlog.trim()) {
      setError("Blog description cannot be blank");
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("titleBlog", form.titleBlog);
      formData.append("descBlog", form.descBlog);
      if (form.image && form.image instanceof File) {
        formData.append("image", form.image);
      }
      await updateBlog(form._id, formData);
      if (onSave) onSave();
      onClose();
    } catch (err) {
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
          <h2 className="text-xl font-semibold text-gray-800">Blog Details</h2>

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
            <label className="text-sm text-gray-600">Title</label>
            <input
              type="text"
              name="titleBlog"
              value={form.titleBlog}
              onChange={handleChange}
              className="mt-1 border rounded px-3 py-2 w-full text-sm focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              type="text"
              name="descBlog"
              value={form.descBlog}
              onChange={handleChange}
              className="mt-1 border px-3 py-2 w-full rounded-lg focus:ring-2 focus:ring-indigo-400 text-sm"
              placeholder="Description"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="mt-1 border px-3 py-2 w-full rounded-lg focus:ring-2 focus:ring-indigo-400 text-sm"
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

          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-semibold"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-lg text-sm font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
