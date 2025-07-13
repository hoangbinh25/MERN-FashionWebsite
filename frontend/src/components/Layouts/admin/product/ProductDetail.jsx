import React, { useState } from "react";
import { updateProduct } from "~/services/productsService";

const IMAGE_TYPES = ".jpg,.jpeg,.png,.webp,.gif,.bmp";

export default function ProductDetail({ product, categories, onClose, onSave }) {
  const [form, setForm] = useState(
    product
      ? {
        nameProduct: product.nameProduct || "",
        description: product.description || "",
        price: product.price || 0,
        quantity: product.quantity || 0,
        size: product.size || "",
        color: product.color || "",
        category: product.category?._id || "",
        image: product.image[0] || "",
        images: product.image || [],
      }
      : {
        nameProduct: "",
        description: "",
        price: 0,
        quantity: 0,
        size: "",
        color: "",
        category: "",
        image: "",
        images: [],
      }
  );
  const [mainIndex, setMainIndex] = useState(0);
  const [error, setError] = useState(null);

  if (!product) return null;

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

  const handleSetMain = (idx) => {
    setForm((prev) => ({
      ...prev,
      image: prev.images[idx],
    }));
    setMainIndex(idx);
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Note: API may expect file uploads instead of base64 strings for images
      const productData = {
        nameProduct: form.nameProduct,
        description: form.description,
        price: form.price,
        quantity: form.quantity,
        size: form.size,
        color: form.color,
        category: form.category,
        image: form.image,
        images: form.images
      };
      await updateProduct(product._id, productData);
      onSave();
    } catch (error) {
      console.error("Failed to update product:", error);
      setError(error.response?.data?.message || "Failed to update product");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-2 sm:px-8 md:px-16 lg:px-32">
      <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-8 w-full max-w-4xl relative flex flex-col">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-xl sm:text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 flex flex-col gap-3">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div>
              <label className="text-xs sm:text-sm font-semibold text-gray-600">Name</label>
              <input
                type="text"
                name="nameProduct"
                value={form.nameProduct}
                onChange={handleChange}
                className="border rounded px-2 sm:px-3 py-1.5 sm:py-2 w-full focus:ring-2 focus:ring-indigo-400 mt-1 text-sm"
                required
              />
            </div>
            <div>
              <label className="text-xs sm:text-sm font-semibold text-gray-600">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="border rounded px-2 sm:px-3 py-1.5 sm:py-2 w-full focus:ring-2 focus:ring-indigo-400 mt-1 text-sm"
                rows={2}
                required
              />
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-xs sm:text-sm font-semibold text-gray-600">Price (VND)</label>
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
              <div className="flex-1">
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
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-xs sm:text-sm font-semibold text-gray-600">Size</label>
                <input
                  type="text"
                  name="size"
                  value={form.size}
                  onChange={handleChange}
                  className="border rounded px-2 sm:px-3 py-1.5 sm:py-2 w-full focus:ring-2 focus:ring-indigo-400 mt-1 text-sm"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="text-xs sm:text-sm font-semibold text-gray-600">Color</label>
                <input
                  type="text"
                  name="color"
                  value={form.color}
                  onChange={handleChange}
                  className="border rounded px-2 sm:px-3 py-1.5 sm:py-2 w-full focus:ring-2 focus:ring-indigo-400 mt-1 text-sm"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-xs sm:text-sm font-semibold text-gray-600">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="border rounded px-2 sm:px-3 py-1.5 sm:py-2 w-full focus:ring-2 focus:ring-indigo-400 mt-1 text-sm"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.nameCategory}
                  </option>
                ))}
              </select>
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
          </div>
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <div className="w-40 h-40 sm:w-56 sm:h-56 mb-2 relative flex flex-col items-center">
              <img
                src={form.image || "https://via.placeholder.com/150?text=No+Image"}
                alt={form.nameProduct}
                className="w-full h-full object-cover rounded-lg border"
              />
            </div>
            <label className="mt-2 w-full flex flex-col items-center cursor-pointer">
              <span className="inline-block bg-indigo-100 text-indigo-700 px-2 sm:px-3 py-1 rounded font-medium text-xs hover:bg-indigo-200 transition mb-1">
                Add Multiple Images
              </span>
              <input
                type="file"
                accept={IMAGE_TYPES}
                multiple
                onChange={handleImagesFile}
                className="hidden"
              />
            </label>
            <div className="flex gap-2 mt-2 flex-wrap justify-center overflow-x-auto">
              {(form.images || []).map((img, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={img}
                    alt={`thumb-${idx}`}
                    className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded border cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}