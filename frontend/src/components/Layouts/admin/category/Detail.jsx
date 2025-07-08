import React, { useState } from "react";

export default function CategoryDetail({ category, onClose, onSave }) {
  const [form, setForm] = useState(
    category
      ? {
          id: category.id,
          name: category.name,
        }
      : { id: "", name: "" }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave({ ...category, ...form });
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
          <h2 className="text-xl font-semibold text-gray-800">Category Details</h2>
          <div className="flex flex-col gap-3">
            <div>
              <label className="text-xs sm:text-sm font-semibold text-gray-600">ID</label>
              <input
                type="text"
                name="id"
                value={form.id}
                onChange={handleChange}
                className="border rounded px-2 sm:px-3 py-1.5 sm:py-2 w-full focus:ring-2 focus:ring-indigo-400 mt-1 text-sm"
                required
                disabled
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