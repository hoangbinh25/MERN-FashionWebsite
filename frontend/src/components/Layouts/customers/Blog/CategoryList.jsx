import { Link } from "react-router-dom";
import { useCategories } from "~/hooks/useCategories";

export default function CategoryList() {
    const { data: categories = [] } = useCategories();

    return (
        <ul className="divide-y">
            {categories.map((cat) => (
                <li
                    key={cat._id}
                    className="text-[16px]"
                >
                    <Link
                        to={`/user/shop?category=${encodeURIComponent(cat._id)}`}
                        className="block px-2 py-2 text-gray-600 transition hover:text-indigo-500"
                    >
                        {cat.nameCategory}
                    </Link>
                </li>
            ))}
        </ul>
    );

}
