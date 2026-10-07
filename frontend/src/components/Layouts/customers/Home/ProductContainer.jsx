import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "~/context/CartContext";
import { getAllCategory } from "~/services/categoriesService";
import { getAllProducts } from "~/services/productsService";
import Product from "./Product";

const DEFAULT_PAGINATION = { currentPage: 1, totalPages: 1, totalItems: 0 };
const PRODUCT_LIMIT = 12;

export default function ProductContainer() {
    const [activeCategory, setActiveCategory] = useState("All Products");
    const [showFilter, setShowFilter] = useState(false);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [selectedPriceRange, setSelectedPriceRange] = useState(null);
    const [showDetail, setShowDetail] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { fetchCartCount } = useCart();

    const handleCategoryChange = (categoryId) => {
        setActiveCategory(categoryId);
        setPagination((previous) => ({ ...previous, currentPage: 1 }));
    };

    const handlePriceFilter = (range) => {
        setSelectedPriceRange(range);
        setPagination((previous) => ({ ...previous, currentPage: 1 }));
    };

    const getPriceClass = (range) =>
        "cursor-pointer hover:underline " +
        (JSON.stringify(selectedPriceRange) === JSON.stringify(range)
            ? "text-indigo-600 font-semibold"
            : "text-gray-700");

    const { data: queryData } = useQuery({
        queryKey: ["products", activeCategory, selectedPriceRange, pagination.currentPage],
        queryFn: async () => {
            let minPrice = null;
            let maxPrice = null;
            if (selectedPriceRange) {
                [minPrice, maxPrice] = selectedPriceRange;
            }

            const response = await getAllProducts({
                page: pagination.currentPage,
                limit: PRODUCT_LIMIT,
                category: activeCategory,
                minPrice,
                maxPrice,
            });

            const products = (response.data || []).map((item) => {
                let images = [];
                if (Array.isArray(item.image) && item.image.length > 0) {
                    images = item.image;
                } else if (typeof item.image === "string" && item.image) {
                    images = [item.image];
                } else {
                    images = ["https://placehold.co/350x350?text=No+Image"];
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

            return {
                products,
                pagination: {
                    currentPage: response.pageCurrent || 1,
                    totalPages: response.totalPage || 1,
                    totalItems: response.totalProduct || 0,
                },
            };
        },
        keepPreviousData: true,
        staleTime: 300000,
    });

    const productList = queryData?.products || [];
    const pageInfo = queryData?.pagination || DEFAULT_PAGINATION;

    const handlePageChange = (page) => {
        setPagination((previous) => ({ ...previous, currentPage: page }));
    };

    const handleSelectProduct = (product) => {
        setSelectedProduct(product);
        setShowDetail(true);
    };

    const handleCloseDetail = () => {
        setShowDetail(false);
        setSelectedProduct(null);
    };

    const handleCloseDetailAndRefreshCart = async () => {
        handleCloseDetail();
        await fetchCartCount();
    };

    const { data: categoryData = [] } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const response = await getAllCategory({ limit: 1000 });
            return Array.isArray(response.data) ? response.data : [];
        },
        staleTime: 1000 * 60 * 5,
    });

    return (
        <Product
            activeCategory={activeCategory}
            categoryData={categoryData}
            onCategoryChange={handleCategoryChange}
            showFilter={showFilter}
            onToggleFilter={() => setShowFilter((previous) => !previous)}
            onPriceFilter={handlePriceFilter}
            getPriceClass={getPriceClass}
            productList={productList}
            onSelectProduct={handleSelectProduct}
            pageInfo={pageInfo}
            onPageChange={handlePageChange}
            showDetail={showDetail}
            selectedProduct={selectedProduct}
            onCloseDetail={handleCloseDetail}
            onCloseDetailAndRefreshCart={handleCloseDetailAndRefreshCart}
        />
    );
}
