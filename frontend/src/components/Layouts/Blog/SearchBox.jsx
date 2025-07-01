import { FiSearch } from "react-icons/fi";

export default function SearchBox() {
    return (
        <div className="relative mb-8">
            <input
                type="text"
                placeholder="Search"
                className="w-full border rounded-full px-4 py-2 pr-10 focus:outline-none"
            />
            <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
    );

}; 