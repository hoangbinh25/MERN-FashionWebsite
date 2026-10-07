import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useCart } from "~/context/CartContext";
import { getAllProducts } from "~/services/productsService";
import { useCategories } from "~/hooks/useCategories";
import Product from "./Product";

const DEFAULT_PAGINATION = { currentPage: 1, totalPages: 1, totalItems: 0 };
const PRODUCT_LIMIT = 12;

export default function ProductContainer() {
    const [searchParams] = useSearchParams();
    const categoryFromUrl = searchParams.get("category") || "All Products";
    const searchFromUrl = searchParams.get("search") || "";
    const [activeCategory, setActiveCategory] = useState(categoryFromUrl);
    const [showFilter, setShowFilter] = useState(false);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [selectedPriceRange, setSelectedPriceRange] = useState(null);
    const [showDetail, setShowDetail] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { fetchCartCount } = useCart();

    useEffect(() => {
        setActiveCategory(categoryFromUrl);
        setPagination((previous) => ({ ...previous, currentPage: 1 }));
    }, [categoryFromUrl, searchFromUrl]);

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

    const { data: queryData, isLoading, isFetching, isError, error } = useQuery({
        queryKey: ["products", activeCategory, searchFromUrl, selectedPriceRange, pagination.currentPage],
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
                nameProduct: searchFromUrl || undefined,
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
                    variations: item.variations || [],
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

    const { data: categoryData = [] } = useCategories();

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
            isLoading={isLoading}
            isFetching={isFetching}
            errorMessage={isError ? error?.message : ""}
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
