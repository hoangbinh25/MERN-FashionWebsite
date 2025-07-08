import { useState } from "react";
import { Filter as FilterIcon, Plus } from "lucide-react";
import Paginate from "~/components/Layouts/DefaultLayout/admin/Paginate";
import Filter from "../../DefaultLayout/admin/Filter";
import ProductDetail from "./ProductDetail";
import ProductCreate from "./ProductCreate";

export default function ProductTable() {
  const allProducts = [
    // Dữ liệu giữ nguyên, không thay đổi
    {
      id: 1,
      name: "T-Shirt",
      price: 19.99,
      quantity: 120,
      store: "TBN Fashion",
      category: "Clothing",
      image: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg",
    },
    {
      id: 2,
      name: "Sneakers",
      price: 59.99,
      quantity: 45,
      store: "TBN Fashion",
      category: "Shoes",
      image: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg",
    },
    {
      id: 3,
      name: "Hat",
      price: 9.99,
      quantity: 30,
      store: "Summer Store",
      category: "Accessories",
      image: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg",
    },
    ...Array.from({ length: 27 }, (_, i) => ({
      id: i + 4,
      name: `Product ${i + 4}`,
      price: Math.floor(Math.random() * 100),
      quantity: Math.floor(Math.random() * 100),
      store: "TBN Fashion",
      category: "Clothing",
      image: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg",
    })),
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStore, setSelectedStore] = useState("All");
  const [sortBy, setSortBy] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const itemsPerPage = 5;

  const uniqueCategories = ["All", ...new Set(allProducts.map((p) => p.category))];
  const uniqueStores = ["All", ...new Set(allProducts.map((p) => p.store))];

  const filteredProducts = allProducts.filter((product) => {
    const matchCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchStore = selectedStore === "All" || product.store === selectedStore;
    return matchCategory && matchStore;
  });

  if (sortBy === "price-asc") filteredProducts.sort((a, b) => a.price - b.price);
  else if (sortBy === "price-desc") filteredProducts.sort((a, b) => b.price - a.price);
  else if (sortBy === "name") filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  else if (sortBy === "quantity") filteredProducts.sort((a, b) => b.quantity - a.quantity);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white shadow-xl rounded-2xl p-2 sm:p-4 md:p-6">
      {/* Tiêu đề và nút tạo sản phẩm */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">Product List</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          {/* Nút bộ lọc cho mobile: chỉ hiện icon */}
          <button
            className="block md:hidden bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg font-semibold items-center justify-center"
            onClick={() => setShowFilter((v) => !v)}
            aria-label="Bộ lọc"
          >
            <FilterIcon size={20} />
          </button>
          {/* Nút tạo sản phẩm: mobile chỉ icon, desktop có chữ */}
          <button
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-2 rounded-lg font-semibold shadow w-auto sm:w-auto flex items-center justify-center gap-2"
            onClick={() => setShowCreate(true)}
            aria-label="Create Product"
          >
            <Plus size={20} className="sm:mr-1" />
            <span className=" sm:inline">Create Product</span>
          </button>
        </div>
      </div>

      {/* Bộ lọc: mobile ẩn/hiện, desktop luôn hiện */}
      <div className={`${showFilter ? "block" : "hidden"} md:block`}>
        <Filter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          uniqueCategories={uniqueCategories}
          selectedStore={selectedStore}
          setSelectedStore={setSelectedStore}
          uniqueStores={uniqueStores}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>

      {/* Bảng cho desktop, thẻ cho mobile */}
      <div className="block md:hidden">
        {paginatedProducts.map((p, index) => (
          <div
            key={p.id}
            className="border border-gray-200 rounded-lg p-3 mb-3 hover:bg-gray-50 transition cursor-pointer"
            onClick={() => setSelectedProduct(p)}
          >
            <div className="flex items-center gap-3">
              <img
                src={p.image}
                alt={p.name}
                className="w-8 h-8 object-cover rounded-md border"
              />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-800">{p.name}</h3>
                <p className="text-xs text-gray-600">${p.price} | Qty: {p.quantity}</p>
                <p className="text-xs text-gray-500">{p.store} | {p.category}</p>
              </div>
              <div className="flex flex-col gap-1">
                <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-2 py-1 rounded-lg text-xs">
                  Edit
                </button>
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
              <th className="px-2 py-3 border-b">Image</th>
              <th className="px-2 py-3 border-b">Name</th>
              <th className="px-2 py-3 border-b">Price</th>
              <th className="px-2 py-3 border-b">Qty</th>
              <th className="px-2 py-3 border-b">Store</th>
              <th className="px-2 py-3 border-b">Category</th>
              <th className="px-2 py-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map((p, index) => (
              <tr
                key={p.id}
                className="hover:bg-gray-50 transition cursor-pointer"
                onClick={() => setSelectedProduct(p)}
              >
                <td className="px-2 py-3 border-b">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="px-2 py-3 border-b">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-10 h-10 object-cover rounded-md border"
                  />
                </td>
                <td className="px-2 py-3 border-b break-words">{p.name}</td>
                <td className="px-2 py-3 border-b">${p.price}</td>
                <td className="px-2 py-3 border-b">{p.quantity}</td>
                <td className="px-2 py-3 border-b">{p.store}</td>
                <td className="px-2 py-3 border-b">{p.category}</td>
                <td className="px-2 py-3 border-b text-center">
                  <div className="flex justify-center gap-2">
                    <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-2 py-1 rounded-lg text-sm">
                      Edit
                    </button>
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

      {selectedProduct && (
        <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} />
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