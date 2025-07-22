import { useEffect, useState } from "react";
import { Filter as FilterIcon, Plus } from "lucide-react";
import Paginate from "~/components/Layouts/DefaultLayout/admin/Paginate";
import ProductDetail from "./ProductDetail";
import ProductCreate from "./ProductCreate";
import { getAllProducts, deleteProduct, updateProductIsActive } from "~/services/productsService";
import { getAllCategory, getAllCategoryBy } from "~/services/categoriesService";

export default function ProductTable() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  });
  const [sortBy, setSortBy] = useState("nameProduct"); // Đảm bảo đúng tên trường backend
  const [order, setOrder] = useState("desc");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (priceRange) {
      const [min, max] = priceRange.split("-");
      setMinPrice(min);
      setMaxPrice(max);
    } else {
      setMinPrice("");
      setMaxPrice("");
    }
  }, [priceRange]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const safeSearch = search || "";
      console.log("API params:", {
        page: pagination.currentPage,
        limit: 5,
        sort: sortBy || "nameProduct",
        order,
        nameProduct: safeSearch,
        size,
        category: selectedCategory === "All" ? "" : selectedCategory,
        minPrice,
        maxPrice
      });
      const response = await getAllProducts({
        page: pagination.currentPage,
        limit: 5,
        sort: sortBy || "nameProduct",
        order,
        nameProduct: safeSearch,
        size,
        category: selectedCategory === "All" ? "" : selectedCategory,
        minPrice,
        maxPrice
      });
      setProducts(response.data || []);
      setPagination({
        currentPage: response.pageCurrent || response.pagination?.currentPage || 1,
        totalPages: response.totalPage || response.pagination?.totalPages || 1,
        totalItems: response.totalProduct || response.pagination?.totalItems || 0
      });
    } catch (error) {
      console.error("Failed to fetch products:", error);
      console.error("Error details:", error.response?.data || error.message);
      setProducts([]);
      setPagination(prev => ({
        ...prev,
        totalPages: 1,
        totalItems: 0
      }));
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await getAllCategoryBy({
        page: 1,
        sort: "nameCategory",
        order: "desc",
        search: ""
      });
      setCategories(response.data || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("Delete failed!");
    }
  };

  const handleIsActive = async (id, isActive) => {
    const confirmed = window.confirm(`Are you sure you want to ${isActive ? "activate" : "deactivate"} this product?`);
    if (!confirmed) return;
    try {
      await updateProductIsActive(id, !isActive);
      fetchProducts();
    } catch (error) {
      console.error("Failed to update product status:", error);
      alert("Update failed!");
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [pagination.currentPage, sortBy, order, search, selectedCategory, color, size, minPrice, maxPrice]);

  return (
    <div className="bg-white shadow-xl rounded-2xl p-2 sm:p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">Product Management</h2>
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
            aria-label="Create Product"
          >
            <Plus size={20} className="sm:mr-1" />
            <span className="sm:inline">Create Product</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className={`${showFilter ? "block" : "hidden"} md:block mb-4`}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 w-full md:w-1/4">
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Search</label>
            <input
              type="text"
              value={search || ""}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
            />
          </div>
          <div className="flex-1 w-full md:w-1/4">
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
            >
              <option value="All">All</option>
              {categories.map((cat) => (
                <option key={cat.nameCategory} value={cat.nameCategory}>
                  {cat.nameCategory}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 w-full md:w-1/4">
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Size</label>
            <input
              type="text"
              value={size}
              onChange={(e) => {
                setSize(e.target.value);
                setPagination(prev => ({ ...prev, currentPage: 1 }));
              }}
              placeholder="Size..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="flex-1 w-full md:w-1/3">
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Price Range</label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
            >
              <option value="">-- Select --</option>
              <option value="0-500000">0 - 500,000 VND</option>
              <option value="500000-1000000">500,000 - 1,000,000 VND</option>
              <option value="1000000-2000000">1,000,000 - 2,000,000 VND</option>
              <option value="2000000-5000000">2,000,000 - 5,000,000 VND</option>
            </select>
          </div>
          <div className="flex-1 w-full md:w-1/3">
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Order</label>
            <select
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
            >
              <option value="price-desc">Descending</option>
              <option value="price-asc">Ascending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden">
        {loading ? (
          <p>Loading...</p>
        ) : products.length === 0 ? (
          <p>No products found</p>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="border border-gray-200 rounded-lg p-3 mb-3 hover:bg-gray-50 transition cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="flex items-center gap-3">
                <img
                  src={product.image[0] || "/placeholder.jpg"}
                  className="w-10 h-10 rounded object-cover"
                  alt={product.nameProduct}
                />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-800">{product.nameProduct}</h3>
                  <p className="text-xs text-gray-500">Price: {product.price} VND</p>
                  <p className="text-xs text-gray-500">Category: {product.category?.nameCategory || "No Category"}</p>
                </div>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(product._id);
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
              <th className="px-2 py-3 border-b">Image</th>
              <th className="px-2 py-3 border-b">Name</th>
              <th className="px-2 py-3 border-b">Size</th>
              <th className="px-2 py-3 border-b">Description</th>
              <th className="px-2 py-3 border-b">Price</th>
              <th className="px-2 py-3 border-b">Qty</th>
              <th className="px-2 py-3 border-b">Category</th>
              <th className="px-2 py-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="8">Loading...</td></tr>
            ) : products.length === 0 ? (
              <tr><td colSpan="8">No products found</td></tr>
            ) : (
              products.map((product, index) => (
                <tr
                  key={product._id}
                  className="hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <td className="px-2 py-3 border-b">{(pagination.currentPage - 1) * 5 + index + 1}</td>
                  <td className="px-2 py-3 border-b">
                    <img
                      src={product.image[0] || "/placeholder.jpg"}
                      className="w-10 h-10 rounded object-cover"
                      alt={product.nameProduct}
                    />
                  </td>
                  <td className="px-2 py-3 border-b">{product.nameProduct}</td>
                  <td className="px-2 py-3 border-b">{product.size}</td>
                  <td className="px-2 py-3 border-b">
                    <span style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'normal',
                      maxWidth: 240
                    }}>
                      {product.description}
                    </span>
                  </td>
                  <td className="px-2 py-3 border-b">{product.price} VND</td>
                  <td className="px-2 py-3 border-b">{product.quantity}</td>
                  <td className="px-2 py-3 border-b">{product.category?.nameCategory || "No Category"}</td>
                  <td className="px-2 py-3 border-b text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-semibold transition duration-150 shadow-sm ${product.isActive ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-gray-200 text-gray-500 hover:bg-gray-300"}`}
                        title={product.isActive ? "Deactivate" : "Activate"}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleIsActive(product._id, product.isActive);
                        }}
                      >
                        {product.isActive ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        )}
                        {product.isActive ? "Deactivate" : "Activate"}
                      </button>
                      <button
                        className="flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-semibold bg-red-100 text-red-700 hover:bg-red-200 transition duration-150 shadow-sm"
                        title="Delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(product._id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
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
        onPageChange={(page) => {
          console.log("Page changed to:", page);
          setPagination(prev => ({ ...prev, currentPage: page }));
        }}
      />

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          categories={categories}
          onClose={() => {
            setSelectedProduct(null);
            fetchProducts();
          }}
          onSave={() => {
            setSelectedProduct(null);
            fetchProducts();
          }}
        />
      )}

      {showCreate && (
        <ProductCreate
          categories={categories}
          onClose={() => {
            setShowCreate(false);
            fetchProducts();
          }}
          onSave={() => {
            setShowCreate(false);
            fetchProducts();
          }}
        />
      )}
    </div>
  );
}