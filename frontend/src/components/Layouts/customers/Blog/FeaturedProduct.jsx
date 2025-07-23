import { useEffect, useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL_BACKEND;
import { Link } from "react-router-dom";

export default function FeaturedProduct() {
    const [products, setProducts] = useState([]);
    // const navigate = useNavigate();

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
        <div className="space-y-4">
            {products.map((p) => (
                <Link to="/user/home" key={p._id}>
                    <div className="flex items-center space-x-4 py-4">
                        <img src={p.image?.[0] || "/placeholder.jpg"} alt={p.nameProduct} className="w-24 h-24 object-cover rounded" />
                        <div>
                            <div className="font-medium line-clamp-1">{p.nameProduct}</div>
                            <div className="text-gray-500">{p.price?.toLocaleString()} VNĐ</div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );

} 
