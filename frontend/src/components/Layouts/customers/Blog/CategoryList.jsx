import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getAllCategory } from "~/services/categoriesService";

export default function CategoryList() {
    const [categories, setCategories] = useState([])

    const {
        data: categoryData = [],
        isLoading: isCategoryLoading,
    } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await getAllCategory({ limit: 1000 });
            return Array.isArray(res.data) ? res.data : [];
        },
        staleTime: 1000 * 60 * 5,
    });

    return (
        <ul className="divide-y">
            {categoryData.map((cat) => (
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