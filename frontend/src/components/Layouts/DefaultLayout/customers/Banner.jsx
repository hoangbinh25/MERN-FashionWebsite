import { useLocation } from "react-router-dom";
import bannerImg from "~/assets/img/banner.png";
const bannerConfigs = {
    home: {
        img: bannerImg,
        showSlider: true,
    },
    blog: {
        img: "https://themewagon.github.io/cozastore/images/bg-02.jpg",
        h1: "Fashion Blog",
        showSlider: false,
    },
    about: {
        img: "https://themewagon.github.io/cozastore/images/bg-01.jpg",
        h1: "About TBN Store",
        showSlider: false,
    },
    contact: {
        img: "https://themewagon.github.io/cozastore/images/bg-01.jpg",
        h1: "Contact",
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
            <div
                className={`relative z-10 flex flex-col items-${config.showSlider ? "start" : "center"} justify-center h-full max-w-7xl ${config.showSlider ? "pl-56" : "mx-auto text-center"}`}
                style={{ width: "100%" }}
            >
                <h4 className={`text-2xl md:text-3xl mb-2 ${config.showSlider ? "text-gray-600" : "text-white"}`}>
                    {config.h4}
                </h4>
                {config.h1 && (
                    <h1
                        className={`text-5xl md:text-7xl font-bold mb-8 ${config.showSlider ? "text-gray-700" : "text-white"}`}
                        style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                        {config.h1}
                    </h1>
                )}
                {config.showSlider && config.button && (
                    <button className="bg-indigo-400 hover:bg-indigo-500 text-white font-semibold px-10 py-3 rounded-full text-lg transition">
                        {config.button}
                    </button>
                )}
            </div>
        </section>
    );
}
