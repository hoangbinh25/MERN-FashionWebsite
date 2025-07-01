import { FaArrowUp } from "react-icons/fa6";

export default function BtnGoToTop() {
    return (
        <button className="fixed bottom-5 right-5 bg-indigo-400 text-white px-4 py-2 rounded-full hover:bg-indigo-500 transition-colors">
            <FaArrowUp />
        </button>
    )
}