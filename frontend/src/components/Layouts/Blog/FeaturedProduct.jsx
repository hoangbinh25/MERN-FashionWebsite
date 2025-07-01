const products = [
    {
        name: "White Shirt With Pleat Detail Back",
        price: "$19.00",
        img: "https://p9-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/930a70c06549002a2f468bb91243cb26~tplv-tiktokx-cropcenter:720:720.jpeg?dr=14579&refresh_token=426e34ec&x-expires=1751515200&x-signature=VqiWZG6KTQfX44f6oljG1jNJW4M%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=my2"
    },
    {
        name: "Converse All Star Hi Black Canvas",
        price: "$29.00",
        img: "https://p9-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/930a70c06549002a2f468bb91243cb26~tplv-tiktokx-cropcenter:720:720.jpeg?dr=14579&refresh_token=426e34ec&x-expires=1751515200&x-signature=VqiWZG6KTQfX44f6oljG1jNJW4M%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=my2"
    }
];

export default function FeaturedProduct() {
    return (
        <div className="space-y-4">
            {products.map((p) => (
                <div key={p.name} className="flex items-center space-x-4">
                    <img src={p.img} alt={p.name} className="w-16 h-16 object-cover rounded" />
                    <div>
                        <div className="font-medium">{p.name}</div>
                        <div className="text-gray-500">{p.price}</div>
                    </div>
                </div>
            ))}
        </div>
    );

} 