import { useQuery } from "@tanstack/react-query";
import { getAllCategory } from "~/services/categoriesService";

export function useCategories() {
    return useQuery({
        queryKey: ["categories", 1000],
        queryFn: () => getAllCategory({ limit: 1000 }),
        select: (response) => Array.isArray(response.data) ? response.data : [],
        staleTime: 5 * 60 * 1000,
    });
}