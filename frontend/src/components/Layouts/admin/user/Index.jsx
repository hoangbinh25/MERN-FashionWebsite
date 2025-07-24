import { useState, useEffect } from "react";
import { getAllUsers, deleteUser } from "~/services/usersService";
import { Filter as FilterIcon, Plus } from "lucide-react";
import Paginate from "~/components/Layouts/DefaultLayout/admin/Paginate";
import UserDetail from "./Detail"; // Adjust path as needed
import UserCreate from "./Create"; // Adjust path as needed


export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedEnableUser, setSelectedEnableUser] = useState("All");
  const [sortBy, setSortBy] = useState("createdAt");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const itemsPerPage = 5;
  const [loading, setLoading] = useState(false);
  const [searchName, setSearchName] = useState("");

  // Lấy danh sách role từ users
  const uniqueRoles = ["All", ...new Set(users.map((u) => u.role))];
  const uniqueEnableUser = ["All", "Enabled", "Disabled"];

  // Hàm fetchUsers để có thể gọi lại sau khi đóng modal
  const fetchUsers = async () => {
    setLoading(true);
    try {
      let roleParam = selectedRole === "All" ? "" : selectedRole;
      let statusParam = "";
      if (selectedEnableUser === "Enabled") statusParam = true;
      else if (selectedEnableUser === "Disabled") statusParam = false;
      let sortByParam = sortBy === "createdAt" ? "createdAt" : "";
      const params = {
        searchName: searchName,
        page: currentPage,
        limit: itemsPerPage,
        sortBy: sortByParam,
        role: roleParam,
        isActive: statusParam,
      };
      const res = await getAllUsers(params);
      setUsers(res.data || []);
      setTotalPages(res.totalPage || 1);
      setTotalUsers(res.totalUsers || 0);
    } catch (error) {
      setUsers([]);
      setTotalPages(1);
      setTotalUsers(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, [selectedRole, selectedEnableUser, sortBy, currentPage]);

  // Thêm useEffect để fetch khi searchName thay đổi
  useEffect(() => {
    setCurrentPage(1); // Reset về trang 1 khi tìm kiếm mới
    fetchUsers();
    // eslint-disable-next-line
  }, [searchName]);

  const handleEditUser = () => {
    setSelectedUser(null);
    fetchUsers();
  };

  const handleCreateUser = () => {
    setShowCreate(false);
    fetchUsers();
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(userId);
      setSelectedUser(null);
      fetchUsers();
    } catch (error) {
      alert("Delete user failed!");
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-2 sm:p-4 md:p-6">
      {/* Tiêu đề và nút tạo người dùng */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">Quản lý người dùng</h2>
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
            <span className="sm:inline">Thêm người dùng</span>
          </button>
        </div>
      </div>

      {/* Bộ lọc */}
      <div className={`${showFilter ? "block" : "hidden"} md:block mb-4`}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Tìm kiếm</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="Tìm kiếm theo tên . . ."
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Vai trò</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
            >
              <option value="">Tất cả vai trò</option>
              <option value="true">Admin</option>
              <option value="false">Khách hàng</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">IsActive</label>
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
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Sắp xếp</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
            >
              <option value="">-- Chọn --</option>
              <option value="createdAt">Mới nhất</option>
              <option value="">Cũ nhất</option>
            </select>
          </div>
        </div>
      </div>

      {/* Thẻ cho mobile */}
      <div className="block md:hidden">
        {loading ? (
          <p>Loading...</p>
        ) : users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          users.map((user, index) => (
            <div
              key={user._id}
              className="border border-gray-200 rounded-lg p-3 mb-3 hover:bg-gray-50 transition cursor-pointer"
              onClick={() => setSelectedUser(user)}
            >
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-800">{user.firstName} {user.lastName}</h3>
                  <p className="text-xs text-gray-600">{user.email} | {user.phone}</p>
                  <p className="text-xs text-gray-500">{user.role ? "Admin" : "Khách hàng"} | {user.isActive ? "Enabled" : "Disabled"}</p>
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
                    Cập nhật
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteUser(user._id);
                    }}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bảng cho desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700 border border-gray-200 rounded-xl">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="px-2 py-3 border-b">#</th>
              <th className="px-2 py-3 border-b">Tên</th>
              <th className="px-2 py-3 border-b">Tên người dùng</th>
              <th className="px-2 py-3 border-b">Email</th>
              <th className="px-2 py-3 border-b">Số điện thoại</th>
              <th className="px-2 py-3 border-b">Địa chỉ</th>
              <th className="px-2 py-3 border-b">Vai trò</th>
              <th className="px-2 py-3 border-b">Trạng thái</th>
              <th className="px-2 py-3 border-b">Tạo ngày</th>
              <th className="px-2 py-3 border-b text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={10} className="text-center py-8 text-gray-400">Loading...</td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan={10} className="text-center py-8 text-gray-400">Không tìm thấy tài khoản.</td></tr>
            ) : (
              users.map((user, index) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => setSelectedUser(user)}
                >
                  <td className="px-2 py-3 border-b">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="px-2 py-3 border-b break-words">{user.firstName} {user.lastName}</td>
                  <td className="px-2 py-3 border-b">{user.userName}</td>
                  <td className="px-2 py-3 border-b">{user.email}</td>
                  <td className="px-2 py-3 border-b">{user.phone}</td>
                  <td className="px-2 py-3 border-b">{user.address}</td>
                  <td className="px-2 py-3 border-b">{user.role ? "Admin" : "Khách hàng"}</td>
                  <td className="px-2 py-3 border-b">{user.isActive ? "Enabled" : "Disabled"}</td>
                  <td className="px-2 py-3 border-b">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="px-2 py-3 border-b text-center">
                    <div className="flex justify-center gap-2">

                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg text-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteUser(user._id);
                        }}
                      >
                        Xóa
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
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Modal for User Details */}
      {selectedUser && (
        <UserDetail
          user={selectedUser}
          onClose={() => setSelectedUser(null)
          }
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