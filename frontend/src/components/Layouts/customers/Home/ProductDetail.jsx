import { X, ChevronLeft, ChevronRight, Minus, Plus, ShoppingBag } from "lucide-react";
import { useProductDetail } from "~/hooks/useProductDetail";
import { optimizeCloudinaryImage } from "~/utils/image";

const fallbackSizes = ["S", "M", "L", "XL", "XXL"];

export default function ProductDetail({ product, onClose }) {
    const {
        images,
        mainImg,
        setMainImg,
        size,
        setSize,
        quantity,
        setQuantity,
        handlePreviousImage,
        handleNextImage,
        handleAddToCart,
        isAdding,
    } = useProductDetail(product, onClose);

    if (!product) return null;

    const productName = product.name || product.nameProduct || "Sản phẩm";
    const variationSizes = product.variations?.map((variation) => variation.size).filter(Boolean) || [];
    const sizes = product.sizes?.length
        ? product.sizes
        : variationSizes.length ? variationSizes : fallbackSizes;
    const uniqueSizes = [...new Set(sizes)];
    const formattedPrice = Number(product.price || 0).toLocaleString("vi-VN");

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6">
            <button
                type="button"
                aria-label="Đóng chi tiết sản phẩm"
                onClick={onClose}
                className="absolute inset-0 bg-slate-950/55 backdrop-blur-sm"
            />

            <section
                role="dialog"
                aria-modal="true"
                aria-label={`Chi tiết ${productName}`}
                className="relative z-10 max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Đóng"
                    className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-slate-600 shadow-md transition hover:bg-slate-900 hover:text-white"
                >
                    <X size={21} />
                </button>

                <div className="grid lg:grid-cols-2">
                    <div className="bg-slate-50 p-5 sm:p-8 lg:p-10">
                        <div className="relative grid min-h-[320px] place-items-center overflow-hidden rounded-2xl bg-white sm:min-h-[500px]">
                            {mainImg ? (
                                <img
                                    src={optimizeCloudinaryImage(mainImg, 1200) || mainImg}
                                    alt={productName}
                                    className="h-full max-h-[500px] w-full object-contain p-6"
                                    onError={(event) => { event.currentTarget.src = "https://placehold.co/900x900?text=No+Image"; }}
                                />
                            ) : (
                                <span className="text-sm text-slate-400">Chưa có ảnh sản phẩm</span>
                            )}

                            {images.length > 1 && <>
                                <button type="button" onClick={handlePreviousImage} aria-label="Ảnh trước"
                                    className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-800 shadow transition hover:scale-105">
                                    <ChevronLeft size={22} />
                                </button>
                                <button type="button" onClick={handleNextImage} aria-label="Ảnh sau"
                                    className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-800 shadow transition hover:scale-105">
                                    <ChevronRight size={22} />
                                </button>
                            </>}
                        </div>

                        {images.length > 1 && <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                            {images.map((image, index) => (
                                <button key={`${image}-${index}`} type="button" onClick={() => setMainImg(image)}
                                    className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition ${mainImg === image ? "border-indigo-600 ring-2 ring-indigo-100" : "border-transparent hover:border-slate-300"}`}>
                                    <img src={optimizeCloudinaryImage(image, 160) || image} alt={`${productName} ${index + 1}`} className="h-full w-full object-cover" />
                                </button>
                            ))}
                        </div>}
                    </div>

                    <div className="p-6 sm:p-10 lg:p-12">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">TBN Store selection</p>
                        <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">{productName}</h2>
                        <p className="mt-5 text-3xl font-bold text-indigo-600">{formattedPrice} VNĐ</p>
                        <p className="mt-6 border-t border-slate-100 pt-6 leading-7 text-slate-600">
                            {product.description || "Sản phẩm được chọn lọc dành cho phong cách hàng ngày của bạn."}
                        </p>

                        <div className="mt-8">
                            <div className="mb-3 flex items-center justify-between">
                                <p className="font-semibold text-slate-900">Chọn kích cỡ</p>
                                {size && <span className="text-sm text-indigo-600">Đã chọn: {size}</span>}
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {uniqueSizes.map((itemSize) => (
                                    <button key={itemSize} type="button" onClick={() => setSize(itemSize)}
                                        className={`min-w-12 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${size === itemSize ? "border-indigo-600 bg-indigo-600 text-white shadow-sm" : "border-slate-200 text-slate-700 hover:border-indigo-300"}`}>
                                        {itemSize}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 flex items-center justify-between gap-4">
                            <p className="font-semibold text-slate-900">Số lượng</p>
                            <div className="flex items-center rounded-xl border border-slate-200 bg-white p-1">
                                <button type="button" aria-label="Giảm số lượng" onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                                    className="grid h-9 w-9 place-items-center rounded-lg text-slate-600 transition hover:bg-slate-100"><Minus size={16} /></button>
                                <span className="w-10 text-center font-semibold text-slate-900">{quantity}</span>
                                <button type="button" aria-label="Tăng số lượng" onClick={() => setQuantity((value) => value + 1)}
                                    className="grid h-9 w-9 place-items-center rounded-lg text-slate-600 transition hover:bg-slate-100"><Plus size={16} /></button>
                            </div>
                        </div>

                        <button type="button" onClick={handleAddToCart} disabled={isAdding}
                            className="mt-9 flex w-full items-center justify-center gap-3 rounded-xl bg-indigo-600 py-4 font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70">
                            <ShoppingBag size={20} />
                            {isAdding ? "Đang thêm vào giỏ..." : "Thêm vào giỏ hàng"}
                        </button>
                        <p className="mt-4 text-center text-xs text-slate-400">Miễn phí đổi trả trong 7 ngày cho sản phẩm chưa sử dụng.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
