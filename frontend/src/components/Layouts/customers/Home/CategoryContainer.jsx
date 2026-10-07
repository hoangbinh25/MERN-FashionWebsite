import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "~/services/productsService";
import Category from "./Category";

export default function CategoryContainer() {
    const [selectedProduct, setSelectedProduct] = useState(null);

    const { data: products = [], isLoading, isError } = useQuery({
        queryKey: ["products", "featured", 3],
        queryFn: async () => {
            const response = await getAllProducts({
                limit: 3,
                sort: "createdAt",
                order: "desc",
            });
            return Array.isArray(response.data) ? response.data : [];
        },
        staleTime: 1000 * 60 * 5,
    });

    const handleCloseDetail = () => {
        setSelectedProduct(null);
    };

    return (
        <Category
            products={products}
            isLoading={isLoading}
            hasError={isError}
            selectedProduct={selectedProduct}
            onSelectProduct={setSelectedProduct}
            onCloseDetail={handleCloseDetail}
        />
    );
}
