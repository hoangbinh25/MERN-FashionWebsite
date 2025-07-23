import React from 'react';
import { Users, Zap, ShoppingCart, Truck } from 'lucide-react';

const founders = [
    {
        name: 'Nguyen Thanh Tung',
        role: 'Co-Founder & CEO',
        bio: 'Với niềm đam mê mãnh liệt với thời trang và kinh doanh, Tùng dẫn dắt TBN Store với tầm nhìn mở rộng thương hiệu ngày càng lớn mạnh.',
        imageUrl: 'https://res.cloudinary.com/djjrooopy/image/upload/v1752403066/20231006_123545_j7ggcd.jpg',
    },
    {
        name: 'Trinh Cam Nhung',
        role: 'Co-Founder & Creative Director',
        bio: 'Nhung thổi hồn vào từng sản phẩm. Cô chịu trách nhiệm thiết kế, đảm bảo mỗi bộ sưu tập đều độc đáo và hợp thời trang.',
        imageUrl: 'https://res.cloudinary.com/djjrooopy/image/upload/v1752403076/z6800473229717_8a117a46944926632ffab042622c8bb3_gtsq6j.jpg',
    },
    {
        name: 'Hoang Phu Binh',
        role: 'Co-Founder & CTO',
        bio: 'Bình là chuyên gia công nghệ đứng sau trải nghiệm mua sắm mượt mà, luôn cập nhật để mang lại sự tiện lợi tốt nhất.',
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
                            <h2 className="text-4xl font-bold text-gray-900">Người Sáng Lập</h2>
                            <p className="mt-3 text-gray-600">Chúng tôi là những người bạn cùng chung đam mê.</p>

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
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">Hành Trình Của Chúng Tôi</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                TBN Store được thành lập từ tình bạn và đam mê thời trang của Tùng, Nhung và Bình. Chúng tôi nhận ra rằng việc tìm kiếm những bộ quần áo hợp thời, chất lượng và giá cả phải chăng tại Việt Nam là một thách thức. Vì vậy, ý tưởng về một cửa hàng trực tuyến giúp mọi người dễ dàng tiếp cận xu hướng mới đã ra đời. Bắt đầu từ một căn phòng nhỏ với vài chiếc máy may, chúng tôi đã nỗ lực không ngừng để nghiên cứu thị trường, lựa chọn từng loại vải và hoàn thiện từng đường kim mũi chỉ. TBN Store là tâm huyết, là nỗ lực để mang đến cho bạn không chỉ quần áo, mà còn là sự tự tin và phong cách.
                            </p>
                        </div>
                    </div>

                    {/* --- Shopping Features --- */}
                    <div>
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-gray-900">Mua Sắm Dễ Dàng Hơn Bao Giờ Hết</h2>
                            <p className="mt-3 text-gray-600">Trải nghiệm mua sắm trực tuyến mượt mà và nhanh chóng tại TBN Store.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                            <Feature icon={<ShoppingCart size={36} />} title="Trải Nghiệm Mượt Mà">
                                Giao diện thân thiện, dễ tìm kiếm và chọn sản phẩm chỉ với vài cú nhấp.
                            </Feature>
                            <Feature icon={<Zap size={36} />} title="Thanh Toán Nhanh Chóng">
                                Hỗ trợ nhiều phương thức thanh toán an toàn, xử lý đơn hàng chỉ trong vài giây.
                            </Feature>
                            <Feature icon={<Truck size={36} />} title="	Giao Hàng Toàn Quốc">
                                Chúng tôi hợp tác với các đơn vị vận chuyển uy tín để giao hàng nhanh chóng tận nơi.
                            </Feature>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
