import CategoryContainer from "~/components/Layouts/customers/Home/CategoryContainer";
import ProductContainer from "~/components/Layouts/customers/Home/ProductContainer";

export default function Home() {
    return (
        <div className="container mx-auto px-4">
            <CategoryContainer />
            <ProductContainer />
        </div>
    );
}
