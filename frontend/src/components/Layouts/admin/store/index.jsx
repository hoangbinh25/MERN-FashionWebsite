import { useState } from "react";
import { Filter as FilterIcon, Plus } from "lucide-react";
import Paginate from "~/components/Layouts/DefaultLayout/admin/Paginate";

export default function StoreTable() {
  // Dữ liệu mẫu kho
  const allStores = [
    {
      id: 1,
      name: "TBN Fashion",
      address: "123 Lê Lợi, Đà Nẵng",
      phone: "0901234567",
      manager: "Nguyen Van A",
      status: "Active",
      image: "https://cdn-icons-png.flaticon.com/512/892/892458.png",
    },
    {
      id: 2,
      name: "Summer Store",
      address: "456 Trần Phú, Đà Nẵng",
      phone: "0912345678",
      manager: "Tran Thi B",
      status: "Inactive",
      image: "https://cdn-icons-png.flaticon.com/512/892/892458.png",
    },
    ...Array.from({ length: 13 }, (_, i) => ({
      id: i + 3,
      name: `Store ${i + 3}`,
      address: `Address ${i + 3}, Đà Nẵng`,
      phone: `09${Math.floor(10000000 + Math.random() * 89999999)}`,
      manager: `Manager ${i + 3}`,
      status: i % 2 === 0 ? "Active" : "Inactive",
      image: "https://cdn-icons-png.flaticon.com/512/892/892458.png",
    })),
  ];

  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortBy, setSortBy] = useState("");
  const [selectedStore, setSelectedStore] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const itemsPerPage = 5;

  const uniqueStatus = ["All", ...new Set(allStores.map((s) => s.status))];

  const filteredStores = allStores.filter((store) => {
    const matchStatus = selectedStatus === "All" || store.status === selectedStatus;
    return matchStatus;
  });

  if (sortBy === "name") filteredStores.sort((a, b) => a.name.localeCompare(b.name));
  else if (sortBy === "status") filteredStores.sort((a, b) => a.status.localeCompare(b.status));

  const totalPages = Math.ceil(filteredStores.length / itemsPerPage);
  const paginatedStores = filteredStores.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white shadow-xl rounded-2xl p-2 sm:p-4 md:p-6">
      {/* Tiêu đề và nút tạo kho */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">Warehouse Management</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          {/* Nút bộ lọc cho mobile: chỉ hiện icon */}
          <button
            className="block md:hidden bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg font-semibold items-center justify-center"
            onClick={() => setShowFilter((v) => !v)}
            aria-label="Bộ lọc"
          >
            <FilterIcon size={20} />
          </button>
          {/* Nút tạo kho */}
          <button
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-2 rounded-lg font-semibold shadow w-auto sm:w-auto flex items-center justify-center gap-2"
            onClick={() => setShowCreate(true)}
            aria-label="Create Store"
          >
            <Plus size={20} className="sm:mr-1" />
            <span className=" sm:inline">Create Store</span>
          </button>
        </div>
      </div>

      {/* Bộ lọc: mobile ẩn/hiện, desktop luôn hiện */}
      <div className={`${showFilter ? "block" : "hidden"} md:block mb-4`}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
            >
              {uniqueStatus.map((status, idx) => (
                <option key={idx} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Sort by</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
            >
              <option value="">-- Select --</option>
              <option value="name">Name</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bảng cho desktop, thẻ cho mobile */}
      <div className="block md:hidden">
        {paginatedStores.map((store, index) => (
          <div
            key={store.id}
            className="border border-gray-200 rounded-lg p-3 mb-3 hover:bg-gray-50 transition cursor-pointer"
            onClick={() => setSelectedStore(store)}
          >
            <div className="flex items-center gap-3">
              <img
                src={store.image}
                alt={store.name}
                className="w-8 h-8 object-cover rounded-md border"
              />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-800">{store.name}</h3>
                <p className="text-xs text-gray-600">{store.address}</p>
                <p className="text-xs text-gray-500">{store.phone} | {store.manager}</p>
                <p className="text-xs text-gray-400">{store.status}</p>
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
              <th className="px-2 py-3 border-b">Address</th>
              <th className="px-2 py-3 border-b">Phone</th>
              <th className="px-2 py-3 border-b">Manager</th>
              <th className="px-2 py-3 border-b">Status</th>
              <th className="px-2 py-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedStores.map((store, index) => (
              <tr
                key={store.id}
                className="hover:bg-gray-50 transition cursor-pointer"
                onClick={() => setSelectedStore(store)}
              >
                <td className="px-2 py-3 border-b">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="px-2 py-3 border-b">
                  <img
                    src={store.image}
                    alt={store.name}
                    className="w-10 h-10 object-cover rounded-md border"
                  />
                </td>
                <td className="px-2 py-3 border-b break-words">{store.name}</td>
                <td className="px-2 py-3 border-b">{store.address}</td>
                <td className="px-2 py-3 border-b">{store.phone}</td>
                <td className="px-2 py-3 border-b">{store.manager}</td>
                <td className="px-2 py-3 border-b">{store.status}</td>
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

      {/* Modal chi tiết hoặc tạo kho có thể thêm sau */}
      {/* {selectedStore && (
        <StoreDetail store={selectedStore} onClose={() => setSelectedStore(null)} />
      )}
      {showCreate && (
        <StoreCreate
          onClose={() => setShowCreate(false)}
          onSave={() => setShowCreate(false)}
        />
      )} */}
    </div>
  );
}