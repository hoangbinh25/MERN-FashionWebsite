import React, { useState } from "react";
import { createProduct } from "~/services/productsService";

const IMAGE_TYPES = ".jpg,.jpeg,.png,.webp,.gif,.bmp";

export default function ProductCreate({ categories, onClose, onSave }) {
  const [form, setForm] = useState({
    nameProduct: "",
    description: "",
    price: 0,
    category: "",
    image: "https://example.com/image1.jpg",
    images: ["https://example.com/image1.jpg"],
    variations: [{ size: "", quantity: 0 }],
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVariationChange = (index, field, value) => {
    const updated = [...form.variations];
    updated[index][field] = field === "quantity" ? Number(value) : value
    setForm(prev => ({ ...prev, variations: updated }))
  };

  const addVariation = () => {
    setForm(prev => ({
      ...prev,
      variations: [...prev.variations, { size: "", quantity: 0 }]
    }))
  }

  const removeVariation = (index) => {
    const updated = [...form.variations];
    updated.splice(index, 1);
    setForm(prev => ({ ...prev, variations: updated }));
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
    setLoading(true);
    try {
      // Build FormData for file upload
      const formData = new FormData();
      formData.append("nameProduct", form.nameProduct);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("variations", JSON.stringify(form.variations));
      formData.append("category", form.category);
      // Chỉ truyền field 'images' (mảng file)
      if (form.imagesFiles && form.imagesFiles.length > 0) {
        for (let i = 0; i < form.imagesFiles.length; i++) {
          formData.append("images", form.imagesFiles[i]);
        }
      }
      await createProduct(formData);
      onSave();
    } catch (error) {
      console.error("Failed to create product:", error);
      setError(error.response?.data?.message || "Failed to create product");
    } finally {
      setLoading(false);
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
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs sm:text-sm font-semibold text-gray-600">Variations (Size + Quantity)</label>
              {form.variations.map((v, idx) => (
                <div key={idx} className="flex gap-3 items-center">
                  <select
                    value={v.size}
                    onChange={(e) => handleVariationChange(idx, "size", e.target.value)}
                    className="border rounded px-2 py-1 w-32 text-sm"
                    required
                  >
                    <option value="">Choose size</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                  </select>
                  <input
                    type="number"
                    min={0}
                    value={v.quantity}
                    onChange={(e) => handleVariationChange(idx, "quantity", e.target.value)}
                    placeholder="Quantity"
                    className="border rounded px-2 py-1 w-24 text-sm"
                    required
                  />
                  {form.variations.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeVariation(idx)}
                      className="text-red-500 text-sm font-semibold"
                    >
                      ✖
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addVariation}
                className="text-indigo-500 hover:underline text-sm mt-1"
              >
                + Add Variation
              </button>
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
                className={`bg-indigo-500 hover:bg-indigo-600 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg font-semibold shadow text-sm flex items-center justify-center ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                    Saving...
                  </span>
                ) : (
                  'Create'
                )}
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
              {/* Hiển thị ảnh đầu tiên nếu có */}
              {form.imagesFiles && form.imagesFiles.length > 0 ? (
                <img
                  src={URL.createObjectURL(form.imagesFiles[0])}
                  alt={form.nameProduct}
                  className="w-full h-full object-cover rounded-lg border"
                />
              ) : (
                <img
                  src={form.image}
                  alt={form.nameProduct}
                  className="w-full h-full object-cover rounded-lg border"
                />
              )}
              <label className="mt-2 w-full flex flex-col items-center cursor-pointer">
                <span className="inline-block bg-indigo-100 text-indigo-700 px-2 sm:px-3 py-1 rounded font-medium text-xs hover:bg-indigo-200 transition mb-1">
                  Thêm nhiều ảnh sản phẩm
                </span>
                <input
                  type="file"
                  accept={IMAGE_TYPES}
                  multiple
                  onChange={e => {
                    if (e.target.files && e.target.files.length > 0) {
                      setForm(prev => ({
                        ...prev,
                        imagesFiles: Array.from(e.target.files),
                        images: Array.from(e.target.files).map(file => URL.createObjectURL(file))
                      }));
                    }
                  }}
                  className="hidden"
                />
              </label>
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