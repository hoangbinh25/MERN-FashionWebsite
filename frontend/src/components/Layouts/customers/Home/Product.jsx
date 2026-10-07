import ProductDetail from "./ProductDetail";
import Paginate from "../../DefaultLayout/admin/Paginate";
import { optimizeCloudinaryImage } from "~/utils/image";

export default function Product({
    activeCategory,
    categoryData,
    onCategoryChange,
    showFilter,
    onToggleFilter,
    onPriceFilter,
    getPriceClass,
    productList,
    isLoading,
    isFetching,
    errorMessage,
    onSelectProduct,
    pageInfo,
    onPageChange,
    showDetail,
    selectedProduct,
    onCloseDetail,
    onCloseDetailAndRefreshCart,
}) {
    return (
        <>
            <div className="max-w-screen-2xl mx-auto my-16">
                <h1 className="text-4xl font-bold mb-4 pb-3 md:mb-0">SẢN PHẨM</h1>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between my-4">
                    <div>
                        <div className="flex text-xl gap-8">
                            {categoryData.map((category) => (
                                <button
                                    key={category._id}
                                    className={
                                        "transition-all duration-200 " +
                                        (activeCategory === category._id
                                            ? "text-gray-500 underline underline-offset-4 font-semibold"
                                            : "text-gray-500 hover:text-gray-800 hover:underline hover:underline-offset-4")
                                    }
                                    onClick={() => onCategoryChange(category._id)}
                                >
                                    {category.nameCategory}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-4 md:mt-0 items-center">
                        <button
                            className="flex items-center gap-2 border px-4 py-2 rounded hover:bg-indigo-500"
                            onClick={onToggleFilter}
                        >
                            <svg width="18" height="18" fill="none" stroke="currentColor"><path d="M3 6h12M6 9h6M9 12h0" strokeWidth="2" strokeLinecap="round" /></svg>
                            Lọc
                        </button>
                    </div>
                </div>

                <div
                    className={`
                        w-full bg-gray-100 rounded shadow mb-8
                        transition-all duration-700 ease-in-out overflow-hidden
                        ${showFilter ? "max-h-[500px] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-8"}
                    `}
                    style={{ willChange: "max-height, opacity, transform" }}
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 p-6">
                        <div>
                            <h3 className="font-bold mb-2">Sắp xếp theo</h3>
                            <ul>
                                <li>Mặc định</li>
                                <li>Phổ biến nhất</li>
                                <li>Mới nhất</li>
                                <li>Giá: Thấp - cao</li>
                                <li>Giá: Cao - thấp</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold mb-2">Price</h3>
                            <ul className="space-y-1 text-gray-700 text-sm">
                                <li onClick={() => onPriceFilter(null)} className={getPriceClass(null)}>Tất cả</li>
                                <li onClick={() => onPriceFilter([0, 500000])} className={getPriceClass([0, 500000])}>0 - 500,000 VNĐ</li>
                                <li onClick={() => onPriceFilter([500000, 1000000])} className={getPriceClass([500000, 1000000])}>500,000 - 1,000,000 VNĐ</li>
                                <li onClick={() => onPriceFilter([1000000, 2000000])} className={getPriceClass([1000000, 2000000])}>1,000,000 - 2,000,000 VNĐ</li>
                                <li onClick={() => onPriceFilter([2000000, 5000000])} className={getPriceClass([2000000, 5000000])}>2,000,000 - 5,000,000 VNĐ</li>
                                <li onClick={() => onPriceFilter([5000000, Infinity])} className={getPriceClass([5000000, Infinity])}>5,000,000 VNĐ +</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {isFetching && !isLoading && <p className="mb-4 text-sm text-gray-500">Đang cập nhật sản phẩm...</p>}
                {errorMessage && <p className="py-12 text-center text-red-600">Không thể tải sản phẩm. Vui lòng thử lại.</p>}
                {isLoading && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12" aria-label="Đang tải sản phẩm">
                    {Array.from({ length: 8 }, (_, index) => <div key={index} className="h-[420px] animate-pulse bg-gray-200" />)}
                </div>}
                {!isLoading && !errorMessage && productList.length === 0 && <p className="py-12 text-center text-gray-500">Không tìm thấy sản phẩm phù hợp.</p>}
                {!isLoading && !errorMessage && productList.length > 0 && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12">
                    {productList.map((product) => (
                        <div
                            key={product.id}
                            className="group relative bg-white overflow-hidden w-full mb-8 cursor-pointer"
                            onClick={() => onSelectProduct(product)}
                        >
                            <img
                                src={optimizeCloudinaryImage(product.images?.[0], 700) || "https://via.placeholder.com/350x350?text=No+Image"}
                                alt={product.name}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-[350px] object-cover"
                            />
                            <button
                                className="
                                    absolute left-1/2 bottom-20 -translate-x-1/2
                                    bg-white text-gray-800 font-semibold rounded-full px-8 py-3 shadow
                                    opacity-0 translate-y-8
                                    group-hover:opacity-100 group-hover:translate-y-0
                                    transition-all duration-500
                                    pointer-events-none group-hover:pointer-events-auto
                                    z-10
                                "
                            >
                                Xem
                            </button>
                            <div className="mt-2 px-2">
                                <div className="text-gray-700 text-base max-w-64">{product.name}</div>
                                <div className="text-gray-500 text-sm">{product.price}VNĐ</div>
                            </div>
                            <button
                                className="absolute right-4 bottom-4 text-gray-400 hover:text-pink-500"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    onSelectProduct(product);
                                }}
                            >
                                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="9" cy="21" r="1" />
                                    <circle cx="20" cy="21" r="1" />
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>}
            </div>
            {!isLoading && !errorMessage && pageInfo.totalPages > 1 && <Paginate
                currentPage={pageInfo.currentPage}
                totalPages={pageInfo.totalPages}
                onPageChange={onPageChange}
            />}
            {showDetail && selectedProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-5xl w-full relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl font-bold z-30"
                            onClick={onCloseDetailAndRefreshCart}
                        >
                            x
                        </button>
                        <ProductDetail
                            product={selectedProduct}
                            onClose={onCloseDetail}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
