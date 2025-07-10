import React from "react";

export default function OurStory() {
    return (
        <div className="bg-white py-16 px-6 md:px-20">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 ">
                {/* Text Section */}
                <div className="lg:w-2/3 w-full">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        Our Story
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                        consequat consequat enim, non auctor massa ultrices non. Morbi sed
                        odio massa. Quisque at vehicula tellus, sed tincidunt augue...
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        Donec gravida lorem elit, quis condimentum ex semper sit amet...
                    </p>
                </div>

                {/* Image Section */}
                <div className="lg:w-1/3 w-full border-[6px] border-gray-200 p-1 overflow-hidden">
                    <img
                        src="https://themewagon.github.io/cozastore/images/about-01.jpg"
                        alt="Our Story"
                        className="w-full h-auto object-cover transform transition-transform duration-300 ease-in-out hover:scale-110"
                    />
                </div>
            </div>
        </div>
    );
}
