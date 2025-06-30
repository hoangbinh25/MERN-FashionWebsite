const Products = [
    {
        img: "https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/42e2ed6d79038f63f25006a8bccf73f6~tplv-tiktokx-cropcenter:720:720.jpeg?dr=14579&refresh_token=843d35d6&x-expires=1751385600&x-signature=tEPuaNoLWmL1rjXHLFg%2BTBhUioU%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=my2",
        name: "Men New-Season",
        h1: "JACKETS & COATS",
        button: "SHOP NOW",
        showSlider: true,
    },
    {
        img: "https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/5e2e0663ed7b47d25bf746cb39b14640~tplv-tiktokx-cropcenter:720:720.jpeg?dr=14579&refresh_token=b1047bcf&x-expires=1751385600&x-signature=WlB3OSgZlpBqsdFSQ0OGr8j7d1c%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=my2",
        name: "Fashion Blog",
        h1: "Latest Trends & Stories",
        button: "READ BLOG",
        showSlider: false,
    },
    {
        img: "https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/3b5e7d8d546387e734816b13a8eb2a15~tplv-tiktokx-cropcenter:720:720.jpeg?dr=14579&refresh_token=eea69e22&x-expires=1751385600&x-signature=xa1%2BypO8y6TrRzZGz%2FOU0p6xMAo%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=my2",
        name: "About Us",
        h1: "Our Story & Mission",
        button: "LEARN MORE",
        showSlider: false,
    },
    {
        img: "https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/b30a4d6e847b2dec4f1567b0c2916f6f~tplv-tiktokx-cropcenter:720:720.jpeg?dr=14579&refresh_token=66a2e319&x-expires=1751385600&x-signature=DsLQYLcTcQrDeQAQZwYKWxemiRM%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=my2",
        name: "Contact",
        h1: "Get In Touch",
        button: "CONTACT US",
        showSlider: false,
    }
];

const categoryProducts = [
    {
        name: "AllProducts"
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
    return (
        <div className="max-w-screen-2xl mx-auto my-16">
            {/* Header Product Overview */}
            <h1 className="text-4xl font-bold mb-4 md:mb-0">PRODUCT OVERVIEW</h1>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 ">
                <div>
                    <div className="flex text-xl gap-8">
                        {categoryProducts.map((cat, index) => {
                            return (
                                <button
                                    key={index}
                                    className="text-gray-500 hover:text-gray-800 hover:underline hover:underline-offset-4 transition-all duration-200"

                                >
                                    {cat.name}
                                </button>
                            )
                        })}
                    </div>
                </div>
                <div className="flex gap-4 md:mt-0 items-center">
                    <button className="flex items-center gap-2 border px-4 py-2 rounded hover:bg-gray-100">
                        <svg width="18" height="18" fill="none" stroke="currentColor"><path d="M3 6h12M6 9h6M9 12h0" strokeWidth="2" strokeLinecap="round" /></svg>
                        Filter
                    </button>
                    <button className="flex items-center gap-2 border px-4 py-2 rounded hover:bg-gray-100">
                        <svg width="18" height="18" fill="none" stroke="currentColor"><circle cx="8" cy="8" r="6" strokeWidth="2" /><line x1="14" y1="14" x2="17" y2="17" strokeWidth="2" strokeLinecap="round" /></svg>
                        Search
                    </button>
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