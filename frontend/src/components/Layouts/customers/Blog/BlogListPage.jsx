import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllBlog } from "~/services/blogService";
import Paginate from "~/components/Layouts/DefaultLayout/admin/Paginate";
import { optimizeCloudinaryImage } from "~/utils/image";

const PAGE_SIZE = 6;

export default function BlogListPage() {
    const [page, setPage] = useState(1);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["blogs", page, PAGE_SIZE],
        queryFn: async () => {
            const response = await getAllBlog({ page, limit: PAGE_SIZE });
            return {
                blogs: Array.isArray(response.data) ? response.data : [],
                pagination: response.pagination,
            };
        },
        staleTime: 5 * 60 * 1000,
    });

    const blogs = data?.blogs || [];
    const pageInfo = data?.pagination || { currentPage: page, totalPages: 1 };

    return (
        <>
            <div className="max-w-5xl mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold mb-8 text-center">Tất cả bài viết</h1>

                {isLoading && <div className="grid grid-cols-1 md:grid-cols-3 gap-8" aria-label="Đang tải bài viết">
                    {[1, 2, 3, 4, 5, 6].map((item) => <div key={item} className="h-80 animate-pulse rounded-lg bg-gray-200" />)}
                </div>}

                {isError && <p className="py-12 text-center text-red-600">Không thể tải bài viết. Vui lòng thử lại.</p>}
                {!isLoading && !isError && blogs.length === 0 && <p className="py-12 text-center text-gray-500">Chưa có bài viết.</p>}

                {!isLoading && !isError && blogs.length > 0 && <div className="grid md:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <Link
                            to={`/user/blog/${blog._id}`}
                            key={blog._id}
                            className="bg-white rounded-lg shadow hover:shadow-lg transition block overflow-hidden"
                        >
                            <img
                                src={optimizeCloudinaryImage(blog.image, 700) || "/placeholder.jpg"}
                                alt={blog.titleBlog}
                                loading="lazy"
                                decoding="async"
                                onError={(event) => { event.currentTarget.src = "/placeholder.jpg"; }}
                                className="w-full h-48 object-cover"
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
                </div>}
            </div>

            {!isLoading && !isError && pageInfo.totalPages > 1 && <div className="mt-6">
                <Paginate
                    currentPage={pageInfo.currentPage}
                    totalPages={pageInfo.totalPages}
                    onPageChange={setPage}
                />
            </div>}
        </>
    );
}
