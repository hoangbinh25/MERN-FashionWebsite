import React from 'react';
import { Users, Zap, ShoppingCart, Truck } from 'lucide-react';

const founders = [
    {
        name: 'Nguyen Thanh Tung',
        role: 'Co-Founder & CEO',
        bio: 'With a strong passion for fashion and business, Tung leads TBN Store with a vision to expand the brand far and wide.',
        imageUrl: 'https://res.cloudinary.com/djjrooopy/image/upload/v1752403066/20231006_123545_j7ggcd.jpg',
    },
    {
        name: 'Trinh Cam Nhung',
        role: 'Co-Founder & Creative Director',
        bio: 'Nhung breathes life into every product. She is responsible for design, ensuring each collection is unique and trendy.',
        imageUrl: 'https://res.cloudinary.com/djjrooopy/image/upload/v1752403076/z6800473229717_8a117a46944926632ffab042622c8bb3_gtsq6j.jpg',
    },
    {
        name: 'Hoang Phu Binh',
        role: 'Co-Founder & CTO',
        bio: 'Binh is the tech expert behind the smooth shopping experience, always updating to bring the best convenience.',
        imageUrl: 'https://res.cloudinary.com/djjrooopy/image/upload/v1752403073/z6800470976260_d71ef6b8d2bb7d02887f4a7b326707ba_g5wsww.jpg',
    },
];

const Feature = ({ icon, title, children }) => (
    <div className="flex flex-col items-center text-center">
        <div className="bg-indigo-100 text-indigo-600 rounded-full p-5 mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-base">{children}</p>
    </div>
);

export default function About() {
    return (
        <main>
            <div className="bg-white font-sans">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                    {/* --- Founders --- */}
                    <div className="mb-20">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-gray-900">Founders</h2>
                            <p className="mt-3 text-gray-600">We are friends sharing the same passion.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                            {founders.map((founder) => (
                                <div
                                    key={founder.name}
                                    className="text-center flex flex-col items-center group"
                                >
                                    <img
                                        className="h-72 w-72 rounded-2xl object-cover mx-auto mb-8 shadow-2xl transition-transform duration-300 group-hover:scale-110 group-hover:shadow-2xl"
                                        src={founder.imageUrl}
                                        alt={`Portrait of ${founder.name}`}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://placehold.co/400x400/EFEFEF/333333?text=Image';
                                        }}
                                    />
                                    <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors duration-200">{founder.name}</h3>
                                    <p className="text-indigo-600 font-medium text-lg mb-2">{founder.role}</p>
                                    <p className="mt-2 text-gray-600 text-base">{founder.bio}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* --- Startup Story --- */}
                    <div className="bg-gray-50 rounded-2xl p-8 md:p-16 mb-20">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="mx-auto text-indigo-600 mb-4">
                                <Users size={48} />
                            </div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                TBN Store was founded from friendship and a shared passion for fashion by Tung, Nhung, and Binh. We realized that finding stylish, quality, and affordable clothing in Vietnam was a challenge. Thus, the idea of an online store where everyone could easily access the latest trends was born. Starting from a small room with a few sewing machines, we worked tirelessly to research the market, handpick every fabric, and perfect every stitch. TBN Store is our dedication, our effort to bring you not just clothes, but confidence and style.
                            </p>
                        </div>
                    </div>

                    {/* --- Shopping Features --- */}
                    <div>
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-gray-900">Shopping Made Easier Than Ever</h2>
                            <p className="mt-3 text-gray-600">Enjoy a seamless and fast online shopping experience at TBN Store.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                            <Feature icon={<ShoppingCart size={36} />} title="Smooth Experience">
                                Friendly website interface, easy to search and select products with just a few clicks.
                            </Feature>
                            <Feature icon={<Zap size={36} />} title="Fast Payment">
                                Multiple secure payment methods supported, orders processed in seconds.
                            </Feature>
                            <Feature icon={<Truck size={36} />} title="Nationwide Delivery">
                                We partner with reputable shipping companies to deliver quickly to your doorstep.
                            </Feature>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
