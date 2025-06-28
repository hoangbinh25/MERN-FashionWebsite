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
        <section className="w-full bg-white py-12">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 justify-center items-center">
                {categories.map((cat) => (
                    <div
                        key={cat.title}
                        className="relative w-[350px] h-[350px] bg-white border border-gray-200 rounded-sm overflow-hidden flex items-center"
                    >
                        {/* Ảnh */}
                        <img
                            src={cat.img}
                            alt={cat.title}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        {/* Overlay trắng nhẹ để chữ dễ đọc */}
                        <div className="absolute inset-0 bg-white bg-opacity-60"></div>
                        {/* Nội dung */}
                        <div className="relative z-10 p-8">
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">{cat.title}</h3>
                            <p className="text-lg text-gray-600">{cat.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}