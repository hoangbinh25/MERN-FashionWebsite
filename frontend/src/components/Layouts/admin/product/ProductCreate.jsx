import React, { useState } from "react";
import { createProduct } from "~/services/productsService";

const IMAGE_TYPES = ".jpg,.jpeg,.png,.webp,.gif,.bmp";

export default function ProductCreate({ categories, onClose, onSave }) {
  const [form, setForm] = useState({
    nameProduct: "",
    description: "",
    price: 0,
    quantity: 0,
    size: "",
    color: "",
    category: "",
    image: "https://example.com/image1.jpg",
    images: ["https://example.com/image1.jpg"],
  });
  const [error, setError] = useState(null);

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
        category: form.category, // Assumes category is ID
        image: form.image, // Main image URL or base64
        images: form.images // Array of image URLs or base64
      };
      await createProduct(productData);
      onSave();
    } catch (error) {
      console.error("Failed to create product:", error);
      setError(error.response?.data?.message || "Failed to create product");
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
                Create
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
                src={form.image}
                alt={form.nameProduct}
                className="w-full h-full object-cover rounded-lg border"
              />
            </div>
            <div className="flex gap-2 mt-2 flex-wrap justify-center overflow-x-auto">
              {(form.images || []).map((img, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={img}
                    alt={`thumb-${idx}`}
                    className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded border"
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