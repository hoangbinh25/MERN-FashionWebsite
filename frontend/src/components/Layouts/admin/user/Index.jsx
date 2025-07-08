import { useState } from "react";
import { Filter as FilterIcon, Plus } from "lucide-react";
import Paginate from "~/components/Layouts/DefaultLayout/admin/Paginate";
import UserDetail from "./Detail"; // Adjust path as needed
import UserCreate from "./Create"; // Adjust path as needed

export default function UserTable() {
  // Dữ liệu mẫu người dùng dựa trên class User
  const [allUsers, setAllUsers] = useState([
    {
      idUser: 1,
      name: "Nguyen Van A",
      username: "nguyenvana",
      password: "hashedpassword1",
      email: "a@gmail.com",
      role: "Admin",
      phone: "0901234567",
      address: "123 Đường Láng, Hà Nội",
      enableUser: true,
      createdAt: "2025-01-01T10:00:00Z",
    },
    {
      idUser: 2,
      name: "Tran Thi B",
      username: "tranthib",
      password: "hashedpassword2",
      email: "b@gmail.com",
      role: "Customer",
      phone: "0912345678",
      address: "456 Lê Lợi, TP.HCM",
      enableUser: true,
      createdAt: "2025-02-01T12:00:00Z",
    },
    {
      idUser: 3,
      name: "Le Van C",
      username: "levanc",
      password: "hashedpassword3",
      email: "c@gmail.com",
      role: "Customer",
      phone: "0987654321",
      address: "789 Trần Phú, Đà Nẵng",
      enableUser: false,
      createdAt: "2025-03-01T15:00:00Z",
    },
    ...Array.from({ length: 17 }, (_, i) => ({
      idUser: i + 4,
      name: `User ${i + 4}`,
      username: `user${i + 4}`,
      password: `hashedpassword${i + 4}`,
      email: `user${i + 4}@gmail.com`,
      role: i % 2 === 0 ? "Admin" : "Customer",
      phone: `09${Math.floor(10000000 + Math.random() * 89999999)}`,
      address: `Address ${i + 4}, Vietnam`,
      enableUser: i % 3 !== 0,
      createdAt: `2025-04-${String(i + 1).padStart(2, "0")}T10:00:00Z`,
    })),
  ]);

  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedEnableUser, setSelectedEnableUser] = useState("All");
  const [sortBy, setSortBy] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const itemsPerPage = 5;

  const uniqueRoles = ["All", ...new Set(allUsers.map((u) => u.role))];
  const uniqueEnableUser = ["All", "Enabled", "Disabled"];

  const filteredUsers = allUsers.filter((user) => {
    const matchRole = selectedRole === "All" || user.role === selectedRole;
    const matchEnableUser =
      selectedEnableUser === "All" ||
      (selectedEnableUser === "Enabled" && user.enableUser) ||
      (selectedEnableUser === "Disabled" && !user.enableUser);
    return matchRole && matchEnableUser;
  });

  if (sortBy === "name") filteredUsers.sort((a, b) => a.name.localeCompare(b.name));
  else if (sortBy === "enableUser")
    filteredUsers.sort((a, b) => Number(b.enableUser) - Number(a.enableUser));
  else if (sortBy === "createdAt")
    filteredUsers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEditUser = (updatedUser) => {
    setAllUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.idUser === updatedUser.idUser ? { ...user, ...updatedUser } : user
      )
    );
    setSelectedUser(null);
  };

  const handleCreateUser = (newUser) => {
    const newId = Math.max(...allUsers.map((u) => u.idUser)) + 1;
    setAllUsers((prevUsers) => [
      ...prevUsers,
      { ...newUser, idUser: newId }
    ]);
    setShowCreate(false);
  };

  const handleDeleteUser = (idUser) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setAllUsers((prevUsers) => prevUsers.filter((user) => user.idUser !== idUser));
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-2 sm:p-4 md:p-6">
      {/* Tiêu đề và nút tạo người dùng */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">User Management</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            className="block md:hidden bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg font-semibold items-center justify-center"
            onClick={() => setShowFilter((v) => !v)}
            aria-label="Bộ lọc"
          >
            <FilterIcon size={20} />
          </button>
          <button
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-2 rounded-lg font-semibold shadow w-auto sm:w-auto flex items-center justify-center gap-2"
            onClick={() => setShowCreate(true)}
            aria-label="Create User"
          >
            <Plus size={20} className="sm:mr-1" />
            <span className="sm:inline">Create User</span>
          </button>
        </div>
      </div>

      {/* Bộ lọc */}
      <div className={`${showFilter ? "block" : "hidden"} md:block mb-4`}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Role</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
            >
              {uniqueRoles.map((role, idx) => (
                <option key={idx} value={role}>{role}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Status</label>
            <select
              value={selectedEnableUser}
              onChange={(e) => setSelectedEnableUser(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
            >
              {uniqueEnableUser.map((status, idx) => (
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
              <option value="enableUser">Status</option>
              <option value="createdAt">Created At</option>
            </select>
          </div>
        </div>
      </div>

      {/* Thẻ cho mobile */}
      <div className="block md:hidden">
        {paginatedUsers.map((user, index) => (
          <div
            key={user.idUser}
            className="border border-gray-200 rounded-lg p-3 mb-3 hover:bg-gray-50 transition cursor-pointer"
            onClick={() => setSelectedUser(user)}
          >
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-800">{user.name}</h3>
                <p className="text-xs text-gray-600">{user.email} | {user.phone}</p>
                <p className="text-xs text-gray-500">{user.role} | {user.enableUser ? "Enabled" : "Disabled"}</p>
                <p className="text-xs text-gray-500">{new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex flex-col gap-1">
                <button
                  className="bg-indigo-500 hover:bg-indigo-600 text-white px-2 py-1 rounded-lg text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedUser(user);
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteUser(user.idUser);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bảng cho desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700 border border-gray-200 rounded-xl">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="px-2 py-3 border-b">#</th>
              <th className="px-2 py-3 border-b">Name</th>
              <th className="px-2 py-3 border-b">Username</th>
              <th className="px-2 py-3 border-b">Email</th>
              <th className="px-2 py-3 border-b">Phone</th>
              <th className="px-2 py-3 border-b">Address</th>
              <th className="px-2 py-3 border-b">Role</th>
              <th className="px-2 py-3 border-b">Status</th>
              <th className="px-2 py-3 border-b">Created At</th>
              <th className="px-2 py-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user, index) => (
              <tr
                key={user.idUser}
                className="hover:bg-gray-50 transition cursor-pointer"
                onClick={() => setSelectedUser(user)}
              >
                <td className="px-2 py-3 border-b">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="px-2 py-3 border-b break-words">{user.name}</td>
                <td className="px-2 py-3 border-b">{user.username}</td>
                <td className="px-2 py-3 border-b">{user.email}</td>
                <td className="px-2 py-3 border-b">{user.phone}</td>
                <td className="px-2 py-3 border-b">{user.address}</td>
                <td className="px-2 py-3 border-b">{user.role}</td>
                <td className="px-2 py-3 border-b">{user.enableUser ? "Enabled" : "Disabled"}</td>
                <td className="px-2 py-3 border-b">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="px-2 py-3 border-b text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      className="bg-indigo-500 hover:bg-indigo-600 text-white px-2 py-1 rounded-lg text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedUser(user);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteUser(user.idUser);
                      }}
                    >
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

      {/* Modal for User Details */}
      {selectedUser && (
        <UserDetail
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onSave={handleEditUser}
        />
      )}

      {/* Modal for Create User */}
      {showCreate && (
        <UserCreate
          onClose={() => setShowCreate(false)}
          onSave={handleCreateUser}
        />
      )}
    </div>
  );
}