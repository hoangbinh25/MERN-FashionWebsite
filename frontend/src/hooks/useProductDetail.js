import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useCart } from "~/context/CartContext";
import { addProductToCart } from "~/services/cartService";

export function useProductDetail(product, onClose) {
    const images = useMemo(() => {
        if (Array.isArray(product?.images) && product.images.length > 0) return product.images;
        if (Array.isArray(product?.image) && product.image.length > 0) return product.image;
        if (typeof product?.img === "string" && product.img) return [product.img];
        return [];
    }, [product]);

    const [mainImg, setMainImg] = useState(images[0] || "");
    const [size, setSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const { fetchCartCount } = useCart();
    const [isAdding, setIsAdding] = useState(false);
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const currentImageIndex = images.findIndex((image) => image === mainImg);

    useEffect(() => {
        setMainImg(images[0] || "");
        setSize("");
        setQuantity(1);
    }, [product?._id, product?.id, images]);

    const handlePreviousImage = () => {
        if (!images.length) return;
        setMainImg(images[(currentImageIndex - 1 + images.length) % images.length]);
    };

    const handleNextImage = () => {
        if (!images.length) return;
        setMainImg(images[(currentImageIndex + 1) % images.length]);
    };

    const addToCart = async ({ id, quantity: productQuantity, price, size: productSize }) => {
        try {
            await addProductToCart(
                user._id || user.id,
                id,
                productQuantity,
                price,
                productSize,
            );
            await fetchCartCount();
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    const handleAddToCart = async (event) => {
        event.stopPropagation();
        if (!size) {
            toast.error("Vui lòng chọn size trước khi thêm vào giỏ hàng");
            return;
        }
        if (!user || (!user._id && !user.id)) {
            toast.error("Vui lòng đăng nhập tài khoản để thêm sản phẩm vào giỏ hàng");
            return;
        }

        try {
            setIsAdding(true);
            await addToCart({
                id: product.id || product._id,
                quantity,
                price: product.price,
                size,
            });
            toast.success("Đã thêm sản phẩm vào giỏ hàng");
            if (typeof onClose === "function") onClose();
        } finally {
            setIsAdding(false);
        }
    };

    return {
        images,
        mainImg,
        setMainImg,
        size,
        setSize,
        quantity,
        setQuantity,
        handlePreviousImage,
        handleNextImage,
        handleAddToCart,
        isAdding,
    };
}
