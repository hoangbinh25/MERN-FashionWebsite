export default function BlogDetail() {
    return (
        <div className="bg-white p-8">
            <div className="relative overflow-hidden">
                <img
                    src="https://themewagon.github.io/cozastore/images/blog-04.jpg" alt="Blog" className="w-full h-[480px] object-cover hover:scale-105 transition-all duration-300"

                />
                <div className="absolute top-6 left-6 bg-white shadow px-4 py-2 text-center">
                    <div className="text-3xl font-bold">22</div>
                    <div className="text-sm text-gray-500">Jan 2018</div>
                </div>
            </div>
            <h1 className="mt-8 text-3xl font-bold">8 Inspiring Ways to Wear Dresses in the Winter</h1>
            <p className="mt-4 text-gray-500">
                Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eget dictum tortor. Donec dictum vitae sapien eu varius
            </p>
        </div>
    )
};
