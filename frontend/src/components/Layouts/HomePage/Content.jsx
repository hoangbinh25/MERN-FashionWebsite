import Banner from "~/components/Layouts/DefaultLayout/Customers/Banner";
import Category from "~/components/Layouts/HomePage/Category";
import Product from "~/components/Layouts/HomePage/Product";

export default function Content() {
    return (
        <div>
            <Category />
            <Product />
        </div>
    );
}
