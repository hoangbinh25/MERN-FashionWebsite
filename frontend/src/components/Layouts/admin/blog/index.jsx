import { useState, useEffect } from "react";
import { Filter as FilterIcon, Plus, SearchCheck } from "lucide-react";
import Paginate from "~/components/Layouts/DefaultLayout/admin/Paginate";
import BlogDetail from "./Detail";
import CreateBlog from "./Create";
import { getAllBlog, deleteBlog } from "~/services/blogService";

export default function BlogTable() {
  const [blogs, setBlogs] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  });
  const [sortBy, setSortBy] = useState("titleBlog");
  const [order, setOrder] = useState("desc");
  const [search, setSearch] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const safeSearch = search || "";
      const response = await getAllBlog({
        page: pagination.currentPage,
        sort: sortBy,
        order,
        search,
        titleBlog: safeSearch,
      });
      setBlogs(response.data || []);
      setPagination({
        currentPage: response.pagination.currentPage || response.pagination?.currentPage || 1,
        totalPages: response.pagination.totalPages || response.pagination?.totalPages || 1,
        totalItems: response.pagination.totalItems || response.pagination?.totalItems || 0
      });
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmed) return;

    try {
      await deleteBlog(id);
      fetchBlogs();
    } catch (error) {
      console.error("Failed to delete blog:", error);
      alert("Delete failed!");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [pagination.currentPage, sortBy, order, search,]);

  return (
    <div className="bg-white shadow-xl rounded-2xl p-2 sm:p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">Quản lý blog</h2>
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
            aria-label="Create Blog"
          >
            <Plus size={20} className="sm:mr-1" />
            <span className="sm:inline">Tạo blog</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className={`${showFilter ? "block" : "hidden"} md:block mb-4`}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 w-full md:w-1/3">
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Tìm kiếm</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm theo tiêu đề"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
            />
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden">
        {loading ? (
          <p>Loading...</p>
        ) : blogs.length === 0 ? (
          <p>Không có blog nào.</p>
        ) : (
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="border border-gray-200 rounded-lg p-3 mb-3 hover:bg-gray-50 transition cursor-pointer"
              onClick={() => setSelectedBlog(blog)}
            >
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-800">{blog.titleBlog}</h3>
                  <p className="text-xs text-gray-500">
                    Created: {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(blog._id);
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
              <th className="px-2 py-3 border-b">Ảnh</th>
              <th className="px-2 py-3 border-b">Tiêu đề</th>
              <th className="px-2 py-3 border-b">Mô tả</th>
              <th className="px-2 py-3 border-b">Tạo ngày</th>
              <th className="px-2 py-3 border-b text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6">Loading...</td></tr>
            ) : blogs.length === 0 ? (
              <tr><td colSpan="6">Không có blog nào.</td></tr>
            ) : (
              blogs.map((blog, index) => (
                <tr
                  key={blog._id}
                  className="hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => setSelectedBlog(blog)}
                >
                  <td className="px-2 py-3 border-b">{(pagination.currentPage - 1) * 5 + index + 1}</td>
                  <td className="px-2 py-3 border-b">
                    {blog.image && (
                      <img src={blog.image} alt={blog.titleBlog} className="w-16 h-16 object-cover rounded border" />
                    )}
                  </td>
                  <td className="px-2 py-3 border-b">{blog.titleBlog}</td>
                  <td className="px-2 py-3 border-b max-w-xs truncate">{blog.descBlog}</td>
                  <td className="px-2 py-3 border-b">{new Date(blog.createdAt).toLocaleDateString()}</td>
                  <td className="px-2 py-3 border-b text-center">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(blog._id);
                      }}
                    >
                      Xóa
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

      {selectedBlog && (
        <BlogDetail
          blog={selectedBlog}
          onClose={() => {
            setSelectedBlog(null);
            fetchBlogs();
          }}
          onSave={() => {
            setSelectedBlog(null);
            fetchBlogs();
          }}
        />
      )}

      {showCreate && (
        <CreateBlog
          onClose={() => {
            setShowCreate(false);
            fetchBlogs();
          }}
          onSuccess={() => {
            setShowCreate(false);
            fetchBlogs();
          }}
        />
      )}
    </div>
  );
}