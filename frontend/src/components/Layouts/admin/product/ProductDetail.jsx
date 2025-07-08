import React, { useState } from "react";

const IMAGE_TYPES = ".jpg,.jpeg,.png,.webp,.gif,.bmp";

export default function ProductDetail({ product, onClose, onSave }) {
  const [form, setForm] = useState(
    product
      ? {
          name: product.name,
          price: product.price,
          quantity: product.quantity,
          store: product.store,
          category: product.category,
          image: product.image,
          images: product.images || [product.image],
        }
      : { images: [] }
  );
  const [mainIndex, setMainIndex] = useState(0);

  if (!product) return null;

  // Chọn nhiều ảnh
  const handleImagesFile = (e) => {
    const files = Array.from(e.target.files);
    const readers = files.map(
      (file) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (ev) => resolve(ev.target.result);
          reader.readAsDataURL(file);
        })
    );
    Promise.all(readers).then((images) => {
      setForm((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...images],
        image: images[0] || prev.image,
      }));
      setMainIndex(0);
    });
  };

  // Đổi ảnh chính
  const handleSetMain = (idx) => {
    setForm((prev) => ({
      ...prev,
      image: prev.images[idx],
    }));
    setMainIndex(idx);
  };

  // Xóa ảnh phụ
  const handleRemoveImage = (idx) => {
    setForm((prev) => {
      const newImages = prev.images.filter((_, i) => i !== idx);
      return {
        ...prev,
        images: newImages,
        image: newImages[mainIndex === idx ? 0 : mainIndex > idx ? mainIndex - 1 : mainIndex] || "",
      };
    });
    setMainIndex((prevIdx) => (prevIdx > idx ? prevIdx - 1 : prevIdx === idx ? 0 : prevIdx));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "quantity" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave({ ...product, ...form });
    onClose();
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
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 sm:gap-6"
        >
          {/* Thông tin sản phẩm */}
          <div className="flex flex-col gap-3">
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
              <label className="text-xs sm:text-sm font-semibold text-gray-600">Price ($)</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="border rounded px-2 sm:px-3 py-1.5 sm:py-2 w-full focus:ring-2 focus:ring-indigo-400 mt-1 text-sm"
                min={0}
                step="0.01"
                required
              />
            </div>
            <div>
              <label className="text-xs sm:text-sm font-semibold text-gray-600">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                className="border rounded px-2 sm:px-3 py-1.5 sm:py-2 w-full focus:ring-2 focus:ring-indigo-400 mt-1 text-sm"
                min={0}
                required
              />
            </div>
            <div>
              <label className="text-xs sm:text-sm font-semibold text-gray-600">Store</label>
              <input
                type="text"
                name="store"
                value={form.store}
                onChange={handleChange}
                className="border rounded px-2 sm:px-3 py-1.5 sm:py-2 w-full focus:ring-2 focus:ring-indigo-400 mt-1 text-sm"
                required
              />
            </div>
            <div>
              <label className="text-xs sm:text-sm font-semibold text-gray-600">Category</label>
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="border rounded px-2 sm:px-3 py-1.5 sm:py-2 w-full focus:ring-2 focus:ring-indigo-400 mt-1 text-sm"
                required
              />
            </div>
          </div>

          {/* Ảnh sản phẩm */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 sm:w-40 sm:h-40 mb-2 relative flex flex-col items-center">
              <img
                src={form.image || "https://via.placeholder.com/150?text=No+Image"}
                alt={form.name}
                className="w-full h-full object-cover rounded-lg border"
              />
            </div>
            <label className="mt-2 w-full flex flex-col items-center cursor-pointer">
              <span className="inline-block bg-indigo-100 text-indigo-700 px-2 sm:px-3 py-1 rounded font-medium text-xs hover:bg-indigo-200 transition mb-1">
                Thêm nhiều ảnh sản phẩm
              </span>
              <input
                type="file"
                accept={IMAGE_TYPES}
                multiple
                onChange={handleImagesFile}
                className="hidden"
              />
            </label>
            {/* Danh sách ảnh nhỏ */}
            <div className="flex gap-2 mt-2 flex-wrap justify-center overflow-x-auto">
              {(form.images || []).map((img, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={img}
                    alt={`thumb-${idx}`}
                    className={`w-8 h-8 sm:w-10 sm:h-10 object-cover rounded border cursor-pointer ${
                      idx === mainIndex ? "ring-2 ring-indigo-500" : ""
                    }`}
                    onClick={() => handleSetMain(idx)}
                  />
                  <button
                    type="button"
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition"
                    onClick={() => handleRemoveImage(idx)}
                    tabIndex={-1}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Nút hành động */}
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