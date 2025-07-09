import { useState, useEffect } from "react";
import { Filter as FilterIcon, Plus } from "lucide-react";
import Paginate from "~/components/Layouts/DefaultLayout/admin/Paginate";
import CategoryDetail from "./Detail";
import CreateCategory from "./Create";
import { getAllCategory, deleteCategory } from "~/services/categoriesService";


export default function CategoryTable() {
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  });
  const [sortBy, setSortBy] = useState("nameCategory");
  const [order, setOrder] = useState("desc");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await getAllCategory({
        page: pagination.currentPage,
        sort: sortBy,
        order,
        search
      });
      console.log("Fetched categories:", response);
      setCategories(response.data);
      setPagination({
        currentPage: response.pagination.currentPage,
        totalPages: response.pagination.totalPages,
        totalItems: response.pagination.totalItems
      });
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this category?");
    if (!confirmed) return;

    try {
      await deleteCategory(id);
      fetchCategories();
    } catch (error) {
      console.error("Failed to delete category:", error);
      alert("Delete failed!");
    }
  };


  useEffect(() => {
    fetchCategories();
  }, [pagination.currentPage, sortBy, order, search]);

  return (
    <div className="bg-white shadow-xl rounded-2xl p-2 sm:p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">Category Management</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            className="block md:hidden bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg font-semibold items-center justify-center"
            onClick={() => setShowFilter((v) => !v)}
            aria-label="Filter"
          >
            <FilterIcon size={20} />
          </button>
          <button
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-2 rounded-lg font-semibold shadow w-auto sm:w-auto flex items-center justify-center gap-2"
            onClick={() => setShowCreate(true)}
            aria-label="Create Category"
          >
            <Plus size={20} className="sm:mr-1" />
            <span className="sm:inline">Create Category</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className={`${showFilter ? "block" : "hidden"} md:block mb-4`}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 w-full md:w-1/3">
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Search</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
            />
          </div>
          <div className="flex-1 w-full md:w-1/3">
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Sort by</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
            >
              <option value="nameCategory">Name</option>
              <option value="createdAt">Created Date</option>
            </select>
          </div>
          <div className="flex-1 w-full md:w-1/3">
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Order</label>
            <select
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden">
        {loading ? (
          <p>Loading...</p>
        ) : categories.length === 0 ? (
          <p>No categories found</p>
        ) : (
          categories.map((cat) => (
            <div
              key={cat._id}
              className="border border-gray-200 rounded-lg p-3 mb-3 hover:bg-gray-50 transition cursor-pointer"
              onClick={() => setSelectedCategory(cat)}
            >
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-800">{cat.nameCategory}</h3>
                  <p className="text-xs text-gray-500">
                    Created: {new Date(cat.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg text-xs"
                  onClick={(e) => {
                    e.stopPropagation(); // tránh kích hoạt xem chi tiết
                    handleDelete(cat._id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700 border border-gray-200 rounded-xl">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="px-2 py-3 border-b">#</th>
              <th className="px-2 py-3 border-b">Name</th>
              <th className="px-2 py-3 border-b">Created At</th>
              <th className="px-2 py-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4">Loading...</td></tr>
            ) : categories.length === 0 ? (
              <tr><td colSpan="4">No categories found</td></tr>
            ) : (
              categories.map((cat, index) => (
                <tr
                  key={cat._id}
                  className="hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => setSelectedCategory(cat)}
                >
                  <td className="px-2 py-3 border-b">{(pagination.currentPage - 1) * 5 + index + 1}</td>
                  <td className="px-2 py-3 border-b">{cat.nameCategory}</td>
                  <td className="px-2 py-3 border-b">{new Date(cat.createdAt).toLocaleDateString()}</td>
                  <td className="px-2 py-3 border-b text-center">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(cat._id);
                      }}
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Paginate
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={(page) => setPagination(prev => ({ ...prev, currentPage: page }))}
      />

      {selectedCategory && (
        <CategoryDetail
          category={selectedCategory}
          onClose={() => {
            setSelectedCategory(null);
            fetchCategories();
          }}
          onSave={() => {
            setSelectedCategory(null);
            fetchCategories();
          }}
        />
      )}


      {showCreate && (
        <CreateCategory
          onClose={() => {
            setShowCreate(false);
            fetchCategories();
          }}
          onSave={() => {
            setShowCreate(false);
            fetchCategories();

          }}
        />
      )}
    </div>
  );
}