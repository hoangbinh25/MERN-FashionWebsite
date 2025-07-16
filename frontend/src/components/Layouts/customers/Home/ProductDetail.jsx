import { useState } from "react";

export default function ProductDetail({ onClose }) {
    // Demo data, bạn có thể thay bằng props hoặc API
    const images = [
        "https://themewagon.github.io/cozastore/images/product-detail-01.jpg",
        "https://themewagon.github.io/cozastore/images/product-detail-02.jpg",
        "https://themewagon.github.io/cozastore/images/product-detail-03.jpg"
    ];
    const [mainImg, setMainImg] = useState(images[0]);
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [quantity, setQuantity] = useState(1);

    return (
        <div className="max-w-screen-xl mx-auto px-2 py-4 flex flex-col md:flex-row gap-6 md:gap-12 relative">
            {/* Mobile close button */}
            <button
                className="block md:hidden absolute top-2 right-2 z-20 bg-white rounded-full p-2 shadow text-xl font-bold"
                onClick={onClose}
                aria-label="Đóng"
            >
                &times;
            </button>
            {/* Left: Image slider */}
            <div className="flex flex-col gap-2 w-full md:w-1/2">
                <div className="bg-gray-100 flex items-center justify-center h-[220px] sm:h-[280px] md:h-[350px] relative">
                    <img src={mainImg} alt="Product" className="max-h-[160px] sm:max-h-[220px] md:max-h-[300px] object-contain" />
                    {/* Zoom icon */}
                    <button className="absolute top-2 right-2 bg-white rounded-full p-2 shadow hover:scale-110 transition">
                        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="10" cy="10" r="8" /><line x1="16" y1="16" x2="21" y2="21" strokeWidth="2" strokeLinecap="round" /></svg>
                    </button>
                    {/* Prev/Next arrows */}
                    <button className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-200 rounded-full p-2 shadow hover:bg-gray-300">
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 4l-6 6 6 6" /></svg>
                    </button>
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-200 rounded-full p-2 shadow hover:bg-gray-300">
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 4l6 6-6 6" /></svg>
                    </button>
                </div>
                <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-2">
                    {images.map((img, idx) => (
                        <img key={idx} src={img} alt="Thumb" className={`w-10 h-10 sm:w-14 sm:h-14 object-cover rounded cursor-pointer border ${mainImg === img ? "border-indigo-500" : "border-transparent"}`} onClick={() => setMainImg(img)} />
                    ))}
                </div>
            </div>

            {/* Right: Info */}
            <div className="w-full md:w-1/2 flex flex-col gap-3 md:gap-6">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">Lightweight Jacket</h2>
                <div className="text-base sm:text-lg md:text-xl font-bold text-gray-700">$58.79</div>
                <p className="text-gray-500 mb-2 text-xs sm:text-sm md:text-base">Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.</p>
                <div className="flex flex-col gap-2 sm:gap-3">
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                        <div className="w-full sm:w-32">
                            <label className="block text-xs sm:text-sm font-medium mb-1">Size</label>
                            <select value={size} onChange={e => setSize(e.target.value)} className="w-full border rounded px-2 py-1 sm:px-3 sm:py-2">
                                <option value="">Choose an option</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                            </select>
                        </div>
                        <div className="w-full sm:w-32">
                            <label className="block text-xs sm:text-sm font-medium mb-1">Color</label>
                            <select value={color} onChange={e => setColor(e.target.value)} className="w-full border rounded px-2 py-1 sm:px-3 sm:py-2">
                                <option value="">Choose an option</option>
                                <option value="Black">Black</option>
                                <option value="Blue">Blue</option>
                                <option value="Grey">Grey</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <label className="block text-xs sm:text-sm font-medium">Quantity</label>
                        <button className="border rounded px-2" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                        <input type="number" value={quantity} min={1} readOnly className="w-10 sm:w-12 text-center border rounded" />
                        <button className="border rounded px-2" onClick={() => setQuantity(q => q + 1)}>+</button>
                    </div>
                    <button className="w-full bg-indigo-500 text-white font-semibold py-2 sm:py-3 rounded mt-3 hover:bg-indigo-600 transition">ADD TO CART</button>
                </div>
                <div className="flex gap-2 sm:gap-4 mt-3">
                    <button className="text-gray-400 hover:text-indigo-500"><svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg></button>
                    <button className="text-gray-400 hover:text-indigo-500"><svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM6 2H3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" /></svg></button>
                    <button className="text-gray-400 hover:text-indigo-500"><svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M14.31 8a4 4 0 0 1 0 8H9.69a4 4 0 0 1 0-8" /></svg></button>
                    <button className="text-gray-400 hover:text-indigo-500"><svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M16 8a4 4 0 0 1-8 0" /></svg></button>
                </div>
            </div>
        </div>
    );
}