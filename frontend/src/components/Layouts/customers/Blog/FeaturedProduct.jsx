import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function FeaturedProduct() {
    const {
        data: productNew = [],
        isLoading: isProductNewLoading,
    } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await getAllProducts({
                limit: 3,
                sort: "createdAt",
                order: "desc"
            })
            return Array.isArray(res.data) ? res.data : [];
        },
        staleTime: 1000 * 60 * 5,
    });

    return (
        <div className="space-y-4">
            {productNew.map((p) => (
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
