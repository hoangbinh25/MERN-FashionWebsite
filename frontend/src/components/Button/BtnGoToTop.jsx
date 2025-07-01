import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

export default function BtnGoToTop() {
    const [goToTop, setGoToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 200) {
                setGoToTop(true);
            } else {
                setGoToTop(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!goToTop) return null;

    return (
        <button
            className="fixed bottom-5 right-5 bg-indigo-400 text-white px-4 py-2 rounded-full hover:bg-indigo-500 transition-colors"
            onClick={handleClick}
        >
            <FaArrowUp />
        </button>
    );
}