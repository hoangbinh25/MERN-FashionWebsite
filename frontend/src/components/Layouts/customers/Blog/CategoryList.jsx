import { useEffect, useState } from "react";
import { getAllCategory } from "~/services/categoriesService";

export default function CategoryList() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await getAllCategory({ limit: 1000 });
                setCategories(Array.isArray(res.data) ? res.data : []);
            } catch (error) {
                setCategories([]);
            }
        }
        fetchCategories();
    }, [])

    return (
        <ul className="divide-y">
            {categories.map((cat) => (
                <li
                    key={cat._id}
                    className="py-2 px-2 hover:text-indigo-500 cursor-pointer transition opacity-50 text-[16px]"
                >
                    {cat.nameCategory}
                </li>
            ))}
        </ul>
    );

}