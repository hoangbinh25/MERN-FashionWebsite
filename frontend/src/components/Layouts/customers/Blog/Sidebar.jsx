import CategoryList from "./CategoryList";
import SearchBox from "./SearchBox";
import FeaturedProduct from "./FeaturedProduct";

export default function Sidebar() {
    return (
        <aside className="w-full md:w-1/3 md:pl-12 mt-12 md:mt-0 p-8">
            <SearchBox />
            <div className="mb-8">
                <h2 className="font-bold text-2xl mb-4">Danh mục</h2>
                <CategoryList />
            </div>
            <div>
                <h2 className="font-bold text-2xl mb-4">Sản phẩm mới</h2>
                <FeaturedProduct />
            </div>
        </aside>
    )

}
