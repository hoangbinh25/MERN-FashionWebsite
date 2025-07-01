
const categories = [
    "Fashion",
    "Beauty",
    "Street Style",
    "Life Style",
    "DIY & Crafts",
];

export default function CategoryList() {
    return (
        <ul className="divide-y">
            {categories.map((cat) => (
                <li
                    key={cat}
                    className="py-2 px-2 hover:text-indigo-500 cursor-pointer transition opacity-50 text-[16px]"
                >
                    {cat}
                </li>
            ))}
        </ul>
    );

}