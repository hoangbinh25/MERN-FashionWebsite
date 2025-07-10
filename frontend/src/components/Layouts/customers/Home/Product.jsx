import { useState } from "react";

const Products = [
    {
        img: "https://themewagon.github.io/cozastore/images/product-01.jpg",
        name: "Men New-Season",
        h1: "JACKETS & COATS",
        button: "SHOP NOW",
        showSlider: true,
    },
    {
        img: "https://themewagon.github.io/cozastore/images/product-02.jpg",
        name: "Fashion Blog",
        h1: "Latest Trends & Stories",
        button: "READ BLOG",
        showSlider: false,
    },
    {
        img: "https://themewagon.github.io/cozastore/images/product-03.jpg",
        name: "About Us",
        h1: "Our Story & Mission",
        button: "LEARN MORE",
        showSlider: false,
    },
    {
        img: "https://themewagon.github.io/cozastore/images/product-04.jpg",
        name: "Contact",
        h1: "Get In Touch",
        button: "CONTACT US",
        showSlider: false,
    }
];

const categoryProducts = [
    {
        name: "All Products"
    },
    {
        name: "Women"
    },
    {
        name: "Men"
    },
    {
        name: "Bag"
    },
    {
        name: "Shoes"
    },
    {
        name: "Watches"
    },
]

export default function Product() {
    const [activeCategory, setActiveCategory] = useState("All Products")
    const [showFilter, setShowFilter] = useState(false);

    return (
        <div className="max-w-screen-2xl mx-auto my-16">
            {/* Header Product Overview */}
            <h1 className="text-4xl font-bold mb-4 pb-3 md:mb-0">PRODUCT OVERVIEW</h1>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between my-4">
                <div>
                    <div className="flex text-xl gap-8">
                        {categoryProducts.map((cat, index) => {
                            return (
                                <button
                                    key={index}
                                    className={
                                        "transition-all duration-200 " +
                                        (activeCategory === cat.name
                                            ? "text-gray-500 underline underline-offset-4 font-semibold"
                                            : "text-gray-500 hover:text-gray-800 hover:underline hover:underline-offset-4")
                                    }
                                    onClick={() => setActiveCategory(cat.name)}
                                >
                                    {cat.name}
                                </button>
                            )
                        })}
                    </div>
                </div>
                <div className="flex gap-4 md:mt-0 items-center">
                    <button
                        className="flex items-center gap-2 border px-4 py-2 rounded hover:bg-indigo-500"
                        onClick={() => setShowFilter((prev) => !prev)}
                    >
                        <svg width="18" height="18" fill="none" stroke="currentColor"><path d="M3 6h12M6 9h6M9 12h0" strokeWidth="2" strokeLinecap="round" /></svg>
                        Filter
                    </button>
                    <button className="flex items-center gap-2 border px-4 py-2 rounded hover:bg-indigo-500">
                        <svg width="18" height="18" fill="none" stroke="currentColor"><circle cx="8" cy="8" r="6" strokeWidth="2" /><line x1="14" y1="14" x2="17" y2="17" strokeWidth="2" strokeLinecap="round" /></svg>
                        Search
                    </button>
                </div>

            </div>

            <div className={`
                w-full bg-gray-100 rounded shadow mb-8
                transition-all duration-700 ease-in-out overflow-hidden
                ${showFilter ? "max-h-[500px] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-8"}
  `}
                style={{ willChange: "max-height, opacity, transform" }}>
                {/* Nội dung filter: Sort By, Price, Color, Tags */}
                <div className="grid grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-bold mb-2">Sort By</h3>
                        <ul>
                            <li>Default</li>
                            <li>Popularity</li>
                            <li>Average rating</li>
                            <li>Newness</li>
                            <li>Price: Low to High</li>
                            <li>Price: High to Low</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">Price</h3>
                        <ul>
                            <li>All</li>
                            <li>$0.00 - $50.00</li>
                            <li>$50.00 - $100.00</li>
                            <li>$100.00 - $150.00</li>
                            <li>$150.00 - $200.00</li>
                            <li>$200.00+</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">Color</h3>
                        <ul>
                            <li>Black</li>
                            <li>Blue</li>
                            <li>Grey</li>
                            <li>Green</li>
                            <li>Red</li>
                            <li>White</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 border rounded-full">Fashion</span>
                            <span className="px-3 py-1 border rounded-full">Lifestyle</span>
                            <span className="px-3 py-1 border rounded-full">Denim</span>
                            <span className="px-3 py-1 border rounded-full">Streetstyle</span>
                            <span className="px-3 py-1 border rounded-full">Crafts</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex gap-8 flex-wrap justify-between">
                {Products.map((product, idx) => (
                    <div key={idx} className="group relative w-[315px] bg-white overflow-hidden">
                        {/* Ảnh sản phẩm */}
                        <img
                            src={product.img}
                            alt={product.name}
                            className="w-full h-[350px] object-cover cursor-pointer "
                        />
                        {/* Nút Quick View chỉ hiện khi hover */}
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
                            Quick View
                        </button>
                        {/* Tên và giá */}
                        <div className="mt-2 px-2">
                            <div className="text-gray-700 text-base">{product.name}</div>
                            <div className="text-gray-500 text-sm">${product.price}</div>
                        </div>
                        {/* Icon yêu thích */}
                        <button className="absolute right-4 bottom-4 text-gray-400 hover:text-pink-500">
                            <svg width="24" height="24" fill="none" stroke="currentColor">
                                <path d="M12 21C12 21 4 13.5 4 8.5C4 5.5 6.5 3 9.5 3C11.24 3 12 4.5 12 4.5C12 4.5 12.76 3 14.5 3C17.5 3 20 5.5 20 8.5C20 13.5 12 21 12 21Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}