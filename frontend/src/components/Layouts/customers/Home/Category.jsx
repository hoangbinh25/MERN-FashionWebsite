import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductDetail from "./ProductDetail";

const API_URL = import.meta.env.VITE_API_URL_BACKEND;

export default function Category() {

    const [products, setProducts] = useState([]);
    const [showDetail, setShowDetail] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleCloseDetail = () => {
        setShowDetail(false);
        setSelectedProduct(null);
    };

    useEffect(() => {
        const fetchNewestProducts = async () => {
            try {
                const res = await axios.get(`${API_URL}/product/getProducts`, {
                    params: {
                        limit: 3,
                        sort: "createdAt",
                        order: "desc"
                    }
                });
                setProducts(res.data?.data || []);
            } catch (error) {
                console.error("")
            }
        }
        fetchNewestProducts();
    }, []);
    return (
        <section className="mx-auto bg-white py-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center uppercase">
                Các sản phẩm mới
            </h2>
            <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.slice(0, 3).map((p) => (
                    <div key={p._id} className="group block border border-gray-200 cursor-pointer"
                        onClick={() => {
                            setSelectedProduct(p);
                            setShowDetail(true);
                        }}>
                        <div className="relative w-full h-[350px] overflow-hidden"
                        >
                            <img
                                src={p.image?.[0] || "/placeholder.jpg"}
                                alt={p.nameProduct}
                                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                        <div className="p-4 flex justify-center text-center">
                            <h3 className="text-2xl flex justify-center font-bold text-gray-800 max-w-72">{p.nameProduct}</h3>
                        </div>
                    </div>
                ))}
            </div>
            <ProductDetail
                product={selectedProduct}
                onClose={handleCloseDetail}
            />

        </section>
    );
}