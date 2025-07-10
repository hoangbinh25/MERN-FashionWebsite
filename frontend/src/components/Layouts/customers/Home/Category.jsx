import React from "react";

const categories = [
    {
        title: "Women",
        subtitle: "Spring 2018",
        img: "https://themewagon.github.io/cozastore/images/banner-01.jpg",
    },
    {
        title: "Men",
        subtitle: "Spring 2018",
        img: "https://themewagon.github.io/cozastore/images/banner-02.jpg",
    },
    {
        title: "Accessories",
        subtitle: "New Trend",
        img: "https://themewagon.github.io/cozastore/images/banner-03.jpg",
    },
];

export default function Category() {
    return (
        <section className="mx-auto bg-white py-16">
            <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row gap-8 justify-between items-center">
                {categories.map((cat) => (
                    <div
                        key={cat.title}
                        className="group relative w-[430px] h-[290px] bg-white border border-gray-200 rounded-sm overflow-hidden flex items-center cursor-pointer"
                    >
                        {/* Ảnh */}
                        <img
                            src={cat.img}
                            alt={cat.title}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        {/* Overlay xanh chỉ hiện khi hover */}
                        <div className="absolute inset-0 bg-indigo-400 transition-opacity duration-300 pointer-events-none group-hover:opacity-80 group-hover:pointer-events-auto opacity-0"></div>
                        {/* Nội dung */}
                        <div className="relative z-10 p-8">
                            <h3 className="text-2xl font-bold text-gray-800 group-hover:text-white mb-2 transition-colors duration-300">{cat.title}</h3>
                            <p className="text-lg text-gray-600 group-hover:text-white transition-colors duration-300">{cat.subtitle}</p>
                            {/* Nút chỉ hiện khi hover */}
                            <button className="mt-8 px-0 py-0 text-white font-semibold text-lg border-b-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                SHOP NOW
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}