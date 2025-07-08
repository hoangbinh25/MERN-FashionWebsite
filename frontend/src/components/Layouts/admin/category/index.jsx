import { useState } from "react";
import { Filter as FilterIcon, Plus } from "lucide-react";
import Paginate from "~/components/Layouts/DefaultLayout/admin/Paginate";
import ProductDetail from "./Detail";
import ProductCreate from "./Create";

export default function CategoryTable() {
  // Dữ liệu mẫu danh mục
  const allCategories = [
    { id: 1, name: "Clothing" },
    { id: 2, name: "Shoes" },
    { id: 3, name: "Accessories" },
    ...Array.from({ length: 17 }, (_, i) => ({
      id: i + 4,
      name: `Category ${i + 4}`,
    })),
  ];

  const [sortBy, setSortBy] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const itemsPerPage = 5;

  // Hiển thị toàn bộ danh mục (có thể thêm điều kiện lọc ở đây nếu muốn)
  let filteredCategories = [...allCategories];

  if (sortBy === "name") filteredCategories.sort((a, b) => a.name.localeCompare(b.name));
  // Xóa sort theo status vì không có trường status

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white shadow-xl rounded-2xl p-2 sm:p-4 md:p-6">
      {/* Tiêu đề và nút tạo danh mục */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">Category Management</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          {/* Nút bộ lọc cho mobile: chỉ hiện icon */}
          <button
            className="block md:hidden bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg font-semibold items-center justify-center"
            onClick={() => setShowFilter((v) => !v)}
            aria-label="Bộ lọc"
          >
            <FilterIcon size={20} />
          </button>
          {/* Nút tạo danh mục */}
          <button
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-2 rounded-lg font-semibold shadow w-auto sm:w-auto flex items-center justify-center gap-2"
            onClick={() => setShowCreate(true)}
            aria-label="Create Category"
          >
            <Plus size={20} className="sm:mr-1" />
            <span className=" sm:inline">Create Category</span>
          </button>
        </div>
      </div>

      {/* Bộ lọc: mobile ẩn/hiện, desktop luôn hiện */}
      <div className={`${showFilter ? "block" : "hidden"} md:block mb-4`}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-3 w-full md:w-1/3">
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Sort by</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
            >
              <option value="">-- Select --</option>
              <option value="name">Name</option>
              <option value="latest">latest</option>
              <option value="oldest">oldest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bảng cho desktop, thẻ cho mobile */}
      <div className="block md:hidden">
        {paginatedCategories.map((cat) => (
          <div
            key={cat.id}
            className="border border-gray-200 rounded-lg p-3 mb-3 hover:bg-gray-50 transition cursor-pointer"
            onClick={() => setSelectedCategory(cat)}
          >
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-800">{cat.name}</h3>
              </div>
              <div className="flex flex-col gap-1">

                <button className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg text-xs">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700 border border-gray-200 rounded-xl">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="px-2 py-3 border-b">#</th>
              <th className="px-2 py-3 border-b">Name</th>
              <th className="px-2 py-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCategories.map((cat, index) => (
              <tr
                key={cat.id}
                className="hover:bg-gray-50 transition cursor-pointer"
                onClick={() => setSelectedCategory(cat)}
              >
                <td className="px-2 py-3 border-b">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="px-2 py-3 border-b">{cat.name}</td>
                <td className="px-2 py-3 border-b text-center">
                  <div className="flex justify-center gap-2">

                    <button className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg text-sm">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Paginate
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {selectedCategory && (
        <ProductDetail product={selectedCategory} onClose={() => setSelectedCategory(null)} />
      )}

      {showCreate && (
        <ProductCreate
          onClose={() => setShowCreate(false)}
          onSave={() => setShowCreate(false)}
        />
      )}
    </div>
  );
}