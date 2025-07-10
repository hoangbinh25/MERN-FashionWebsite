import { useLocation } from "react-router-dom";

const bannerConfigs = {
    home: {
        img: "https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/f31fa69dd7edf46442b9f3f9f8d5d209~tplv-tiktokx-cropcenter:720:720.jpeg?dr=14579&refresh_token=0523e347&x-expires=1751518800&x-signature=DJrGJJ%2BIxY3OAdTLJb6vIl0CpxE%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=my2",
        h4: "Men New-Season",
        h1: "JACKETS & COATS",
        button: "SHOP NOW",
        showSlider: true,
    },
    blog: {
        img: "https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/f31fa69dd7edf46442b9f3f9f8d5d209~tplv-tiktokx-cropcenter:720:720.jpeg?dr=14579&refresh_token=0523e347&x-expires=1751518800&x-signature=DJrGJJ%2BIxY3OAdTLJb6vIl0CpxE%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=my2",
        h4: "Fashion Blog",
        h1: "Latest Trends & Stories",
        button: "READ BLOG",
        showSlider: false,
    },
    about: {
        img: "https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/f31fa69dd7edf46442b9f3f9f8d5d209~tplv-tiktokx-cropcenter:720:720.jpeg?dr=14579&refresh_token=0523e347&x-expires=1751518800&x-signature=DJrGJJ%2BIxY3OAdTLJb6vIl0CpxE%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=my2",
        h4: "About Us",
        h1: "Our Story & Mission",
        button: "LEARN MORE",
        showSlider: false,
    },
    contact: {
        img: "https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/f31fa69dd7edf46442b9f3f9f8d5d209~tplv-tiktokx-cropcenter:720:720.jpeg?dr=14579&refresh_token=0523e347&x-expires=1751518800&x-signature=DJrGJJ%2BIxY3OAdTLJb6vIl0CpxE%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=my2",
        h4: "Contact",
        h1: "Get In Touch",
        button: "CONTACT US",
        showSlider: false,
    }
};

function getBannerConfig(pathname) {
    if (pathname === "/" || pathname === "/user/home") return bannerConfigs.home;
    if (pathname.startsWith("/user/blog")) return bannerConfigs.blog;
    if (pathname.startsWith("/user/about")) return bannerConfigs.about;
    if (pathname.startsWith("/user/contact")) return bannerConfigs.contact;
    return bannerConfigs.home;
}

export default function Banner({ bannerHeight }) {
    const location = useLocation();
    const config = getBannerConfig(location.pathname);

    return (
        <section className={`relative w-full ${bannerHeight} flex items-center  overflow-hidden`}>
            {/* Ảnh nền */}
            <img
                src={config.img}
                alt="Banner"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ zIndex: 1 }}
            />
            {/* Overlay xanh nhạt */}
            <div className="absolute inset-0 opacity-70" style={{ zIndex: 2 }}></div>
            {/* Nội dung */}
            <div className="relative z-10 flex flex-col items-start justify-center h-full max-w-7xl pl-56">
                <h4 className="text-2xl md:text-3xl text-gray-600 mb-2">{config.h4}</h4>
                <h1 className="text-5xl md:text-7xl font-bold text-gray-700 mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {config.h1}
                </h1>
                <button className="bg-indigo-400 hover:bg-indigo-500 text-white font-semibold px-10 py-3 rounded-full text-lg transition">
                    {config.button}
                </button>
            </div>
            {/* Nút chuyển slider chỉ hiện ở home */}
            {config.showSlider && (
                <>
                    <button className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-blue-300 hover:text-blue-500">
                        <svg width="32" height="32" fill="currentColor"><polygon points="20,8 12,16 20,24" /></svg>
                    </button>
                    <button className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-blue-300 hover:text-blue-500">
                        <svg width="32" height="32" fill="currentColor"><polygon points="12,8 20,16 12,24" /></svg>
                    </button>
                </>
            )}
        </section>
    );
}
