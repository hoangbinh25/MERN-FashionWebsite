import { ArrowUpRight } from "lucide-react";
import ProductDetail from "./ProductDetail";
import { optimizeCloudinaryImage } from "~/utils/image";

export default function Category({
    products,
    selectedProduct,
    onSelectProduct,
    onCloseDetail,
    isLoading,
    hasError,
}) {
    return (
        <section className="bg-white py-16 sm:py-20">
            <div className="mx-auto max-w-screen-2xl px-4 sm:px-6">
                <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Vừa cập nhật</p>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Các sản phẩm mới</h2>
                    </div>
                    <span className="hidden text-sm text-slate-500 sm:block">Chọn một sản phẩm để xem chi tiết</span>
                </div>

                {isLoading && (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3" aria-label="Đang tải sản phẩm mới">
                        {[1, 2, 3].map((item) => <div key={item} className="aspect-[4/5] animate-pulse rounded-2xl bg-slate-200" />)}
                    </div>
                )}
                {hasError && <p className="text-center text-red-600">Không thể tải sản phẩm mới. Vui lòng thử lại.</p>}
                {!isLoading && !hasError && products.length === 0 && <p className="text-center text-slate-500">Chưa có sản phẩm mới.</p>}
                {!isLoading && !hasError && products.length > 0 && (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {products.slice(0, 3).map((product) => (
                            <article
                                key={product._id}
                                className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70"
                                onClick={() => onSelectProduct(product)}
                            >
                                <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                                    <img
                                        src={optimizeCloudinaryImage(product.image?.[0], 900) || "https://via.placeholder.com/700x875?text=No+Image"}
                                        alt={product.nameProduct}
                                        loading="lazy"
                                        decoding="async"
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950/55 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-700 backdrop-blur">New arrival</span>
                                </div>
                                <div className="flex items-center justify-between gap-4 p-5">
                                    <div className="min-w-0">
                                        <h3 className="line-clamp-1 text-lg font-semibold text-slate-800 transition-colors group-hover:text-indigo-600">{product.nameProduct}</h3>
                                        <p className="mt-1 text-base font-bold text-indigo-600">{Number(product.price || 0).toLocaleString("vi-VN")}đ</p>
                                    </div>
                                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-700 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                                        <ArrowUpRight size={19} />
                                    </span>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
            {selectedProduct && <ProductDetail product={selectedProduct} onClose={onCloseDetail} />}
        </section>
    );
}
