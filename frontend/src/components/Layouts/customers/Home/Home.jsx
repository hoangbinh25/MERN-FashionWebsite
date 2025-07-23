import Category from "~/components/Layouts/customers/Home/Category";
import Product from "~/components/Layouts/customers/Home/Product";

export default function Home() {
    return (
        <div className="container mx-auto px-4">
            <Category />
            <Product />
        </div>
    );
}
