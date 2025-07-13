export default function BlogDetail() {
    return (
        <div className="bg-white">
            {/* Hero Image Section */}
            <div className="relative overflow-hidden">
                <img
                    src="https://themewagon.github.io/cozastore/images/blog-04.jpg"
                    alt="Blog"
                    className="w-full h-[480px] object-cover hover:scale-105 transition-all duration-300"
                />
                <div className="absolute top-6 left-6 bg-white shadow-lg px-4 py-2 text-center rounded-lg">
                    <div className="text-3xl font-bold text-indigo-600">22</div>
                    <div className="text-sm text-gray-500">Jan 2018</div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-6 py-12">
                {/* Article Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4 leading-tight">
                        8 Inspiring Ways to Wear Dresses in the Winter
                    </h1>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                        Discover how to stay stylish and warm during the coldest months with these creative dress styling tips that will transform your winter wardrobe.
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center justify-between border-b border-gray-200 pb-6">
                        <div className="flex items-center space-x-4">
                            <img
                                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face"
                                alt="Author"
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                                <div className="font-semibold text-gray-800">Sarah Johnson</div>
                                <div className="text-sm text-gray-500">Fashion Stylist & Blogger</div>
                            </div>
                        </div>
                        <div className="text-sm text-gray-500">
                            <span>5 min read</span> • <span>Fashion Tips</span>
                        </div>
                    </div>
                </div>

                {/* Article Content */}
                <div className="prose prose-lg max-w-none mb-12">
                    <p className="text-gray-700 leading-relaxed mb-6">
                        Winter doesn't mean you have to pack away your favorite dresses! With the right styling techniques and layering strategies, you can rock dresses all year round while staying cozy and chic. Here are eight inspiring ways to wear dresses during the winter months.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">1. Layer with Chunky Knits</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        One of the most popular winter dress styling techniques is layering with chunky knit sweaters. Choose a fitted dress in a neutral color and pair it with an oversized knit cardigan or sweater. This creates a beautiful contrast between the structured dress and the relaxed knit, while providing essential warmth.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">2. Add Tights and Boots</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        Don't underestimate the power of a good pair of tights! Opt for opaque tights in black, navy, or burgundy to add warmth and sophistication. Pair with ankle boots or knee-high boots for a complete winter-ready look that's both practical and stylish.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">3. Belt Your Outerwear</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        Transform your winter coat into a dress-like silhouette by adding a belt. This technique works especially well with longer coats and creates a flattering cinched waist while maintaining the elegance of your dress underneath.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">4. Mix Textures</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        Winter is the perfect time to experiment with texture mixing. Pair a silk dress with a wool coat, or a velvet dress with a leather jacket. The contrast of textures adds visual interest and creates a more sophisticated, layered look.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">5. Accessorize with Scarves</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        A beautiful scarf can transform any dress into a winter-appropriate outfit. Choose scarves in complementary colors and experiment with different tying techniques. A silk scarf adds elegance, while a chunky knit scarf provides both warmth and style.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">6. Choose Winter-Appropriate Fabrics</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        When shopping for winter dresses, look for fabrics like wool, velvet, corduroy, or thick cotton. These materials provide natural insulation and feel more seasonally appropriate than lightweight summer fabrics.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">7. Layer with Blazers</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        A well-fitted blazer can instantly make any dress more professional and warm. Choose blazers in neutral colors like black, navy, or camel for maximum versatility, or opt for bold colors to make a statement.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">8. Don't Forget the Details</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        Small details can make a big difference in winter dress styling. Add a statement belt, choose dresses with interesting necklines that work well with scarves, or opt for dresses with built-in sleeves for extra warmth.
                    </p>

                    <div className="bg-gray-50 p-6 rounded-lg my-8">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Pro Tips:</h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li>Always keep a pair of emergency tights in your bag</li>
                            <li>Invest in quality thermal underwear for extra warmth</li>
                            <li>Choose dresses with longer hemlines for better coverage</li>
                            <li>Don't be afraid to mix patterns and colors</li>
                        </ul>
                    </div>
                </div>

                {/* Social Sharing */}
                <div className="border-t border-gray-200 pt-8 mb-12">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-600 font-medium">Share this article:</span>
                            <div className="flex space-x-3">
                                <button className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                    </svg>
                                </button>
                                <button className="w-10 h-10 bg-blue-800 text-white rounded-full flex items-center justify-center hover:bg-blue-900 transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                                    </svg>
                                </button>
                                <button className="w-10 h-10 bg-pink-600 text-white rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-500">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span>2.4k views</span>
                        </div>
                    </div>
                </div>

                {/* Related Articles */}
                <div className="border-t border-gray-200 pt-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Related Articles</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "10 Must-Have Accessories for Winter",
                                image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop",
                                date: "Jan 15, 2018"
                            },
                            {
                                title: "How to Style Boots with Dresses",
                                image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&h=200&fit=crop",
                                date: "Jan 10, 2018"
                            },
                            {
                                title: "Winter Color Palette Guide",
                                image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=200&fit=crop",
                                date: "Jan 5, 2018"
                            }
                        ].map((article, index) => (
                            <div key={index} className="group cursor-pointer">
                                <div className="overflow-hidden rounded-lg mb-3">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <h4 className="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors mb-2">
                                    {article.title}
                                </h4>
                                <p className="text-sm text-gray-500">{article.date}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
};
