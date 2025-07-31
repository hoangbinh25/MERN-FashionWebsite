import { useEffect, useState } from "react";
import { getAllBlog } from "~/services/blogService";
import { Link } from "react-router-dom";
import Paginate from "~/components/Layouts/DefaultLayout/admin/Paginate";
import { useQuery } from "@tanstack/react-query";

export default function BlogListPage() {
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

    const {
        data: blogData = [],
        isLoading: isBlogsLoading,
    } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await getAllBlog({ page: pagination.currentPage, limit: 6 });
            return Array.isArray(res.data) ? res.data : [];
        },
        staleTime: 1000 * 60 * 5,
    });

    if (isBlogsLoading) return <div className="text-center py-10">Loading...</div>;

    return (
        <>
            <div className="max-w-5xl mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold mb-8 text-center">Tất cả bài viết</h1>
                <div className="grid md:grid-cols-3 gap-8">
                    {blogData.map(blog => (
                        <Link
                            to={`/user/blog/${blog._id}`}
                            key={blog._id}
                            className="bg-white rounded-lg shadow hover:shadow-lg transition block overflow-hidden"
                        >
                            <img
                                src={blog.image.replace('/uploads/', 'upload/ư_400,h_300,c_fill/')}
                                alt={blog.titleBlog}
                                loading="lazy"
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

            <div className="mt-6">
                <Paginate
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    onPageChange={handlePageChange}
                />
            </div>


        </>

    );
}