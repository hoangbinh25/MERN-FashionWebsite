import { useEffect, useState } from "react";
import { getAllBlog } from "~/services/blogService";
import { Link } from "react-router-dom";
import Paginate from "~/components/Layouts/DefaultLayout/admin/Paginate";

export default function BlogListPage() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDetail, setShowDetail] = useState(false);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
    });

    const handlePageChange = (page) => {
        setPagination(prev => ({ ...prev, currentPage: page }));
    };

    const handleCloseDetail = () => {
        setShowDetail(false);
        setSelectedProduct(null);
    };

    useEffect(() => {
        async function fetchBlogs() {
            try {
                const res = await getAllBlog({ page: pagination.currentPage, limit: 3 }); // lấy tất cả blog
                setBlogs(res.data || []);
                setPagination({
                    currentPage: res.pageCurrent || 1,
                    totalPages: res.totalPage || 1,
                    totalItems: res.totalProduct || 0,
                });
            } catch (err) {
                setBlogs([]);
            } finally {
                setLoading(false);
            }
        }
        fetchBlogs();
    }, [pagination.currentPage]);

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (!blogs.length) return <div className="text-center py-10 text-gray-500">Không có blog nào.</div>;

    return (
        <>
            <div className="max-w-5xl mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold mb-8 text-center">Tất cả bài viết</h1>
                <div className="grid md:grid-cols-3 gap-8">
                    {blogs.map(blog => (
                        <Link
                            to={`/user/blog/${blog._id}`}
                            key={blog._id}
                            className="bg-white rounded-lg shadow hover:shadow-lg transition block overflow-hidden"
                        >
                            <img
                                src={blog.image}
                                alt={blog.titleBlog}
                                className="w-full h-48 object-contain"
                            />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold mb-2">{blog.titleBlog}</h2>
                                <p className="text-gray-600 text-sm line-clamp-3">{blog.descBlog}</p>
                                <div className="text-xs text-gray-400 mt-2">
                                    {new Date(blog.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <Paginate
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
            />

        </>

    );
}