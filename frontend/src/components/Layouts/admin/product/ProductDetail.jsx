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
        variations: product.variations?.map(v => ({
          size: v.size,
          quantity: v.quantity
        })) || [{ size: "", quantity: 0 }],
        category: product.category?._id || "",
        image: product.image[0] || "",
        images: product.image || [],
      }
      : {
        nameProduct: "",
        description: "",
        price: 0,
        variations: [{ size: "", quantity: 0 }],
        category: "",
        image: "",
        images: [],
      }
  );
  const [mainIndex, setMainIndex] = useState(0);
  const [error, setError] = useState(null);
  const [imagesFiles, setImagesFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  if (!product) return null;

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

  const handleImagesFile = (e) => {
    const files = Array.from(e.target.files);
    setImagesFiles(files);
    setForm((prev) => ({
      ...prev,
      images: files.map(file => URL.createObjectURL(file)),
      image: files[0] ? URL.createObjectURL(files[0]) : prev.image,
    }));
    setMainIndex(0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "quantity" && Number(value) < 0) {
      alert("Số lượng cần lớn hơn 0");
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "quantity" ? Number(value) : value,
    }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Build FormData for file upload (giống ProductCreate)
      const formData = new FormData();
      formData.append("nameProduct", form.nameProduct);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("variations", JSON.stringify(form.variations));
      formData.append("category", form.category);
      // Nếu không có ảnh mới, giữ nguyên ảnh cũ
      if (imagesFiles && imagesFiles.length > 0) {
        for (let i = 0; i < imagesFiles.length; i++) {
          formData.append("images", imagesFiles[i]);
        }
      } else {
        // Truyền lại danh sách ảnh cũ (dạng url string)
        const oldImages = product.image || [];
        formData.append("imageOld", JSON.stringify(oldImages));
      }
      await updateProduct(product._id, formData);
      onSave();
    } catch (error) {
      console.error("Failed to update product:", error);
      setError(error.response?.data?.message || "Cập nhật sản phẩm thất bại. Vui lòng kiểm tra lại không để trống và số lượng không được < 0");
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
              <label className="text-xs sm:text-sm font-semibold text-gray-600">Tên<span className="text-red-500">*</span></label>
              <input
                type="text"
                name="nameProduct"
                value={form.nameProduct}
                onChange={handleChange}
                className="border rounded px-2 sm:px-3 py-1.5 sm:py-2 w-full focus:ring-2 focus:ring-indigo-400 mt-1 text-sm"
                placeholder="Tên sản phẩm"
                required
              />
            </div>
            <div>
              <label className="text-xs sm:text-sm font-semibold text-gray-600">Mô tả<span className="text-red-500">*</span></label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="border rounded px-2 sm:px-3 py-1.5 sm:py-2 w-full focus:ring-2 focus:ring-indigo-400 mt-1 text-sm"
                rows={2}
                placeholder="Mô tả"
                required
              />
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-xs sm:text-sm font-semibold text-gray-600">Giá tiền (VND)<span className="text-red-500">*</span></label>
                <input
                  type="number"
                  name="price"
                  value={form.price || ""}
                  onChange={handleChange}
                  className="border rounded px-2 sm:px-3 py-1.5 sm:py-2 w-full focus:ring-2 focus:ring-indigo-400 mt-1 text-sm"
                  step="0.01"
                  placeholder="Nhập giá tiền"
                  min="0"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs sm:text-sm font-semibold text-gray-600">Kích cỡ + số lượng<span className="text-red-500">*</span></label>
              {form.variations.map((v, idx) => (
                <div key={idx} className="flex gap-3 items-center">
                  <select
                    value={v.size}
                    onChange={(e) => handleVariationChange(idx, "size", e.target.value)}
                    className="border rounded px-2 py-1 w-32 text-sm"
                    required
                  >
                    <option value="">Chọn kích cỡ</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                  </select>
                  <input
                    type="number"
                    value={v.quantity || ""}
                    onChange={(e) => handleVariationChange(idx, "quantity", e.target.value)}
                    placeholder="Nhập số lượng"
                    className="border rounded px-2 py-1 w-36 text-sm"
                    min="0"
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
                + Thêm kích cỡ + số lượng
              </button>
            </div>
            <div>
              <label className="text-xs sm:text-sm font-semibold text-gray-600">Danh mục<span className="text-red-500">*</span></label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="border rounded px-2 sm:px-3 py-1.5 sm:py-2 w-full focus:ring-2 focus:ring-indigo-400 mt-1 text-sm"
                required
              >
                <option value="">Chọn danh mục</option>
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
                    Cập nhật...
                  </span>
                ) : (
                  'Cập nhật'
                )}
              </button>
              <button
                type="button"
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg font-semibold text-sm"
                onClick={onClose}
              >
                Hủy bỏ
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