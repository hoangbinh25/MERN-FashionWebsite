import { useProductDetail } from "~/hooks/useProductDetail";

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
    } = useProductDetail(product, onClose);

    if (!product) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
            <div className="absolute inset-0" onClick={onClose}></div>
            <div
                className="min-w-[320px] max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-12 relative bg-white"
                onClick={(e) => e.stopPropagation()}>
                {/* Left: Image slider */}
                <div className="flex flex-col gap-4 sm:gap-6 w-full md:w-1/2">
                    <div className="bg-gray-100 flex items-center justify-center h-[200px] xs:h-[240px] sm:h-[300px] md:h-[360px] lg:h-[400px] relative"
                        onClick={e => e.stopPropagation()}>
                        <img src={mainImg} alt={product.name || "Product"} className="max-h-[140px] xs:max-h-[180px] sm:max-h-[240px] md:max-h-[300px] lg:max-h-[340px] object-contain" />
                        {/* Prev/Next arrows */}
                        <button
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-200 rounded-full p-2 sm:p-3 shadow hover:bg-gray-300"
                            onClick={handlePreviousImage}
                            aria-label="Ảnh trước"
                            type="button"
                        >
                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 4l-6 6 6 6" /></svg>
                        </button>
                        <button
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-200 rounded-full p-2 sm:p-3 shadow hover:bg-gray-300"
                            onClick={handleNextImage}
                            aria-label="Ảnh sau"
                            type="button"
                        >
                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 4l6 6-6 6" /></svg>
                        </button>
                    </div>
                    <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2" onClick={e => e.stopPropagation()}>
                        {images.map((img, idx) => (
                            <img key={idx}
                                src={img}
                                alt="Thumb"
                                className={`w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-cover rounded cursor-pointer border ${mainImg === img ? "border-indigo-500" : "border-transparent"}`}
                                onClick={() => setMainImg(img)} />
                        ))}
                    </div>
                </div>

                {/* Right: Info */}
                <div className="w-full md:w-1/2 flex flex-col gap-4 sm:gap-6 md:gap-8"
                    onClick={e => e.stopPropagation()}>
                    <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold">{product.name}</h2>
                    <div className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-gray-700">
                        {product.price ? `${product.price}VNĐ` : "Liên hệ"}
                    </div>
                    <p className="text-gray-500 text-sm xs:text-base sm:text-lg md:text-xl">{product.description || "Không có mô tả cho sản phẩm này."}</p>
                    <div className="flex flex-col gap-4 sm:gap-6">
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                            <div className="w-full sm:w-32 md:w-36">
                                <label className="block text-sm xs:text-base sm:text-lg font-medium mb-1">Kíck cỡ</label>
                                <select
                                    value={size}
                                    onChange={e => setSize(e.target.value)}
                                    className="w-full border rounded px-3 py-2 sm:px-4 sm:py-3">
                                    <option value="">Chọn</option>
                                    {Array.isArray(product.sizes) && product.sizes.length > 0 ? (
                                        product.sizes.map((sz, idx) => (
                                            <option key={idx} value={sz}>{sz}</option>
                                        ))
                                    ) : (
                                        ["S", "M", "L", "XL", "XXL"].map((sz, idx) => (
                                            <option key={idx} value={sz}>{sz}</option>
                                        ))
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 sm:gap-4">
                            <label className="block text-sm xs:text-base sm:text-lg font-medium">Số lượng:</label>
                            <button className="border rounded px-3 py-1 sm:px-4 sm:py-2" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                            <input
                                type="text"
                                value={quantity}
                                min={1}
                                className="w-12 xs:w-14 sm:w-16 text-center border rounded py-1 sm:py-2"
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                            />
                            <button className="border rounded px-3 py-1 sm:px-4 sm:py-2" onClick={() => setQuantity(q => q + 1)}>+</button>
                        </div>
                        <button className="w-full bg-indigo-500 text-white font-semibold py-3 sm:py-4 rounded mt-4 sm:mt-6 hover:bg-indigo-600 transition"
                            onClick={handleAddToCart}
                        >Thêm vào giỏ hàng</button>
                    </div>
                </div>
            </div>
        </div>
    );
}