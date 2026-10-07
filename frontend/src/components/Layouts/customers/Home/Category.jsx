import ProductDetail from "./ProductDetail";

export default function Category({
    products,
    selectedProduct,
    onSelectProduct,
    onCloseDetail,
}) {
    return (
        <section className="mx-auto bg-white py-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center uppercase">
                Các sản phẩm mới
            </h2>
            <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.slice(0, 3).map((product) => (
                    <div
                        key={product._id}
                        className="group block border border-gray-200 cursor-pointer"
                        onClick={() => onSelectProduct(product)}
                    >
                        <div className="relative w-full h-[350px] overflow-hidden">
                            <img
                                src={product.image?.[0] || "/placeholder.jpg"}
                                alt={product.nameProduct}
                                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                        <div className="p-4 flex justify-center text-center">
                            <h3 className="text-2xl flex justify-center font-bold text-gray-800 max-w-72">
                                {product.nameProduct}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
            <ProductDetail
                product={selectedProduct}
                onClose={onCloseDetail}
            />
        </section>
    );
}
