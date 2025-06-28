export default function Banner() {
    return (
        <section className="relative w-full h-[500px] md:h-[600px] flex items-center bg-blue-200 overflow-hidden">
            {/* Ảnh nền */}
            <img
                src="https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/d1b1796b71a94f6fae31bb058e2cdcf9~tplv-tiktokx-cropcenter:720:720.jpeg?dr=14579&refresh_token=4058a708&x-expires=1751299200&x-signature=4I89ENmzKBOJKi7n9KbT8MYY9II%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=my2"
                alt="Banner"
                className="absolute inset-0 w-full h-full object-contain"
                style={{ zIndex: 1 }}
            />
            {/* Overlay xanh nhạt */}
            <div className="absolute inset-0 bg-blue-200 opacity-70" style={{ zIndex: 2 }}></div>
            {/* Nội dung */}
            <div className="relative z-10 flex flex-col items-start justify-center h-full max-w-7xl pl-8 md:pl-20">
                <h4 className="text-2xl md:text-3xl text-gray-600 mb-2">Men New-Season</h4>
                <h1 className="text-5xl md:text-7xl font-bold text-gray-700 mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
                    JACKETS &amp; COATS
                </h1>
                <button className="bg-indigo-400 hover:bg-indigo-500 text-white font-semibold px-10 py-3 rounded-full text-lg transition">
                    SHOP NOW
                </button>
            </div>
            {/* Nút chuyển slider */}
            <button className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-blue-300 hover:text-blue-500">
                <svg width="32" height="32" fill="currentColor"><polygon points="20,8 12,16 20,24" /></svg>
            </button>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-blue-300 hover:text-blue-500">
                <svg width="32" height="32" fill="currentColor"><polygon points="12,8 20,16 12,24" /></svg>
            </button>
        </section>
    );
}
