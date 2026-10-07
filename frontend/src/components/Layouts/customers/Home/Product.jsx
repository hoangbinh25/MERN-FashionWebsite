import { Eye, ShoppingBag } from "lucide-react";
import Paginate from "../../DefaultLayout/admin/Paginate";
import ProductDetail from "./ProductDetail";
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
    onCloseDetailAndRefreshCart,
}) {
    return (
        <>
            <section className="mx-auto my-16 max-w-screen-2xl px-4 sm:px-6">
                <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Khám phá bộ sưu tập</p>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Sản phẩm</h1>
                    </div>
                    <button
                        type="button"
                        className="flex w-fit items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                        onClick={onToggleFilter}
                    >
                        <svg width="18" height="18" fill="none" stroke="currentColor" aria-hidden="true">
                            <path d="M3 6h12M6 9h6M9 12h0" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        Lọc theo giá
                    </button>
                </div>

                <div className="mb-6 flex flex-wrap gap-x-6 gap-y-3 border-b border-slate-100 pb-5">
                    {categoryData.map((category) => (
                        <button
                            key={category._id}
                            type="button"
                            className={`text-sm font-medium transition ${activeCategory === category._id
                                ? "text-indigo-600"
                                : "text-slate-500 hover:text-slate-900"}`}
                            onClick={() => onCategoryChange(category._id)}
                        >
                            {category.nameCategory}
                        </button>
                    ))}
                </div>

                <div
                    className={`overflow-hidden rounded-2xl bg-slate-50 transition-all duration-500 ${showFilter ? "mb-8 max-h-72 border border-slate-100 opacity-100" : "max-h-0 opacity-0"}`}
                >
                    <div className="p-5 sm:p-6">
                        <h2 className="mb-4 text-sm font-semibold text-slate-800">Khoảng giá</h2>
                        <div className="flex flex-wrap gap-2">
                            {[
                                [null, "Tất cả"],
                                [[0, 500000], "Dưới 500.000đ"],
                                [[500000, 1000000], "500.000đ - 1 triệu"],
                                [[1000000, 2000000], "1 - 2 triệu"],
                                [[2000000, 5000000], "2 - 5 triệu"],
                                [[5000000, Infinity], "Trên 5 triệu"],
                            ].map(([range, label]) => (
                                <button
                                    key={label}
                                    type="button"
                                    className={`rounded-full border px-4 py-2 text-sm transition ${getPriceClass(range)}`}
                                    onClick={() => onPriceFilter(range)}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {isFetching && !isLoading && <p className="mb-4 text-sm text-slate-500">Đang cập nhật sản phẩm...</p>}
                {errorMessage && <p className="py-12 text-center text-red-600">Không thể tải sản phẩm. Vui lòng thử lại.</p>}
                {isLoading && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" aria-label="Đang tải sản phẩm">
                        {Array.from({ length: 8 }, (_, index) => <div key={index} className="aspect-[4/5] animate-pulse rounded-2xl bg-slate-200" />)}
                    </div>
                )}
                {!isLoading && !errorMessage && productList.length === 0 && <p className="py-12 text-center text-slate-500">Không tìm thấy sản phẩm phù hợp.</p>}
                {!isLoading && !errorMessage && productList.length > 0 && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {productList.map((product) => (
                            <article
                                key={product.id}
                                className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70"
                                onClick={() => onSelectProduct(product)}
                            >
                                <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                                    <img
                                        src={optimizeCloudinaryImage(product.images?.[0], 700) || "https://via.placeholder.com/700x875?text=No+Image"}
                                        alt={product.name}
                                        loading="lazy"
                                        decoding="async"
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950/55 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-700 backdrop-blur">Mới về</span>
                                    <button
                                        type="button"
                                        aria-label={`Xem ${product.name}`}
                                        className="absolute bottom-4 left-1/2 flex -translate-x-1/2 translate-y-3 items-center gap-2 whitespace-nowrap rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                                    >
                                        <Eye size={17} /> Xem nhanh
                                    </button>
                                </div>
                                <div className="flex items-start gap-3 p-4">
                                    <div className="min-w-0 flex-1">
                                        <h3 className="line-clamp-2 min-h-12 text-base font-semibold leading-6 text-slate-800 transition-colors group-hover:text-indigo-600">{product.name}</h3>
                                        <p className="mt-2 text-lg font-bold text-indigo-600">{Number(product.price || 0).toLocaleString("vi-VN")}đ</p>
                                    </div>
                                    <button
                                        type="button"
                                        aria-label={`Chọn ${product.name}`}
                                        className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-indigo-50 text-indigo-600 transition-colors hover:bg-indigo-600 hover:text-white"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            onSelectProduct(product);
                                        }}
                                    >
                                        <ShoppingBag size={18} />
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>
            {!isLoading && !errorMessage && pageInfo.totalPages > 1 && (
                <Paginate currentPage={pageInfo.currentPage} totalPages={pageInfo.totalPages} onPageChange={onPageChange} />
            )}
            {showDetail && selectedProduct && <ProductDetail product={selectedProduct} onClose={onCloseDetailAndRefreshCart} />}
        </>
    );
}
