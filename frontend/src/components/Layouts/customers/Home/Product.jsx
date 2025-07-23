import { useState, useEffect } from "react";
import ProductDetail from "./ProductDetail";
import { getAllProducts } from "~/services/productsService";
import { addProductToCart } from "~/services/cartService";
import Paginate from "../../DefaultLayout/admin/Paginate";
import { useCart } from "~/context/CartContext";
import { getAllCategory } from "~/services/categoriesService";

export default function Product() {
    const [activeCategory, setActiveCategory] = useState("All Products");
    const [showFilter, setShowFilter] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
    });
    const [showDetail, setShowDetail] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [categories, setCategories] = useState([])
    const limit = 12;

    const { fetchCartCount } = useCart();

    const loadProducts = async (page = 1) => {
        setLoading(true);
        try {
            const res = await getAllProducts({ page, limit });
            const filtered = (res.data || []).filter(item => item.isActive);
            const mapped = filtered.map(item => {
                let images = [];
                if (Array.isArray(item.image) && item.image.length > 0) {
                    images = item.image;
                } else if (typeof item.image === 'string' && item.image) {
                    images = [item.image];
                } else {
                    images = ["https://via.placeholder.com/350x350?text=No+Image"];
                }
                return {
                    id: item._id,
                    images,
                    name: item.nameProduct,
                    description: item.description || "",
                    size: item.size || null,
                    button: "SHOP NOW",
                    showSlider: false,
                    price: item.price,
                };
            });
            setProducts(mapped);
            setPagination({
                currentPage: res.pageCurrent || 1,
                totalPages: res.totalPage || 1,
                totalItems: res.totalProduct || 0,
            });
        } catch (error) {
            setProducts([]);
            setPagination({ currentPage: 1, totalPages: 1, totalItems: 0 });
        } finally {
            setLoading(false);
        }
    };

    const User = JSON.parse(localStorage.getItem('user'));
    const addToCart = async (product) => {
        try {
            await addProductToCart(User._id || User.id, product.id, 1, product.price);
            await fetchCartCount();
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    useEffect(() => {
        loadProducts(pagination.currentPage);
        // eslint-disable-next-line
    }, [pagination.currentPage]);

    const handlePageChange = (page) => {
        setPagination(prev => ({ ...prev, currentPage: page }));
    };

    const handleCloseDetail = () => {
        setShowDetail(false);
        setSelectedProduct(null);
    };

    useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await getAllCategory({ limit: 1000 })
                setCategories(Array.isArray(res.data) ? res.data : []);
            } catch (error) {
                setCategories([]);
            }
        }
        fetchCategories();
    }, [])

    return (
        <>
            <div className="max-w-screen-2xl mx-auto my-16">
                <h1 className="text-4xl font-bold mb-4 pb-3 md:mb-0">SẢN PHẨM</h1>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between my-4">
                    <div>
                        <div className="flex text-xl gap-8">
                            {categories.map(cat => (
                                <button
                                    key={cat._id}
                                    className={
                                        "transition-all duration-200 " +
                                        (activeCategory === cat.nameCategory
                                            ? "text-gray-500 underline underline-offset-4 font-semibold"
                                            : "text-gray-500 hover:text-gray-800 hover:underline hover:underline-offset-4")
                                    }
                                    onClick={() => setActiveCategory(cat.nameCategory)}
                                >
                                    {cat.nameCategory}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-4 md:mt-0 items-center">
                        <button
                            className="flex items-center gap-2 border px-4 py-2 rounded hover:bg-indigo-500"
                            onClick={() => setShowFilter((prev) => !prev)}
                        >
                            <svg width="18" height="18" fill="none" stroke="currentColor"><path d="M3 6h12M6 9h6M9 12h0" strokeWidth="2" strokeLinecap="round" /></svg>
                            Lọc
                        </button>
                        <button className="flex items-center gap-2 border px-4 py-2 rounded hover:bg-indigo-500">
                            <svg width="18" height="18" fill="none" stroke="currentColor"><circle cx="8" cy="8" r="6" strokeWidth="2" /><line x1="14" y1="14" x2="17" y2="17" strokeWidth="2" strokeLinecap="round" /></svg>
                            Tìm kiếm
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
                            <ul>
                                <li>Tất cả</li>
                                <li>0 - 50 000 VNĐ</li>
                                <li>50 000 VNĐ - 100 000 VNĐ</li>
                                <li>100 000 VNĐ - 150 000 VNĐ</li>
                                <li>150 000 VNĐ - 200 000 VNĐ</li>
                                <li>200 000 VNĐ +</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12">
                    {products.map((product, idx) => (
                        <div
                            key={idx}
                            className="group relative bg-white overflow-hidden w-full mb-8 cursor-pointer"
                            onClick={() => {
                                setSelectedProduct(product);
                                setShowDetail(true);
                            }}
                        >
                            <img
                                src={product.images?.[0] || "https://via.placeholder.com/350x350?text=No+Image"}
                                alt={product.name}
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
                                <div className="text-gray-700 text-base">{product.name}</div>
                                <div className="text-gray-500 text-sm">${product.price}</div>
                            </div>
                            <button className="absolute right-4 bottom-4 text-gray-400 hover:text-pink-500" onClick={e => { e.stopPropagation(); addToCart(product); }}>
                                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="9" cy="21" r="1" />
                                    <circle cx="20" cy="21" r="1" />
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <Paginate
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
            />
            {showDetail && selectedProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-5xl w-full relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl font-bold z-30"
                            onClick={async () => {
                                await handleCloseDetail();
                                await fetchCartCount();
                            }}
                        >
                            x
                        </button>
                        <ProductDetail product={selectedProduct} onClose={handleCloseDetail} hideCloseButton={true} />
                    </div>
                </div>
            )}
        </>
    );
}