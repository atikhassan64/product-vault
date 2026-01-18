"use client";
import React, { useState, useEffect } from 'react'
import Link from 'next/link';

export default function Items() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/products");
                if (res.ok) {
                    const data = await res.json();
                    // Show only first 4 products for featured section
                    setProducts(data.slice(0, 4));
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className='bg-gray-50 py-16'>
            <div className="max-w-[1200px] mx-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Featured Products
                        </p>
                        <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                            Discover our top-rated products with amazing features and competitive pricing.
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="loading loading-spinner loading-lg text-blue-500"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <div key={product.id || product._id} className="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden transition-shadow">
                                        <img
                                            src={product.thumbnailImage}
                                            alt={product.title}
                                            className="w-full h-48 object-cover"
                                            onError={(e) => {
                                                e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                                            }}
                                        />
                                        <div className="p-6">
                                            <h3 className="text-lg font-bold mb-2 truncate">{product.title}</h3>
                                            <p className="text-gray-500 mb-4 truncate">{product.shortDescription}</p>
                                            <div className="flex justify-between items-center">
                                                <span className="text-indigo-600 font-bold text-lg">{product.price}</span>
                                                <Link 
                                                    href={`/detail-product/${product.id || product._id}`}
                                                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 text-sm shadow-lg hover:shadow-xl"
                                                >
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                // Fallback static items if no products available
                                <>
                                    <div className="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden transition-shadow">
                                        <img
                                            src="https://i.rtings.com/assets/pages/6S2WXjTl/best-laptops-20240516-medium.jpg?format=auto"
                                            alt="Laptop"
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-6">
                                            <h3 className="text-lg font-bold mb-2 truncate">Laptop</h3>
                                            <p className="text-gray-500 mb-4 truncate">A portable computer with a built-in screen, keyboard, and battery, perfect for work, study, and entertainment anywhere.</p>
                                            <span className="text-indigo-600 font-bold text-lg">$29.99</span>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden transition-shadow">
                                        <img
                                            src="https://www.techspot.com/articles-info/2988/images/2025-05-19-image-2.jpg"
                                            alt="Smartphone"
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-6">
                                            <h3 className="text-lg font-bold mb-2 truncate">Smartphone</h3>
                                            <p className="text-gray-500 mb-4 truncate">A handheld device that combines calling, internet access, and apps in one compact gadget for everyday connectivity.</p>
                                            <span className="text-indigo-600 font-bold text-lg">$39.99</span>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden transition-shadow">
                                        <img
                                            src="https://halalbari.com/uslive/pnism/10644_img_2021_11_29_050518_64236929.webp"
                                            alt="Wireless Headphones"
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-6">
                                            <h3 className="text-lg font-bold mb-2 truncate">Wireless Headphones</h3>
                                            <p className="text-gray-500 mb-4 truncate">High-quality headphones with Bluetooth connectivity, providing freedom from wires and immersive sound experience.</p>
                                            <span className="text-indigo-600 font-bold text-lg">$49.99</span>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden transition-shadow">
                                        <img
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgVXDVZ-1c6wK_G9DOCD1MAHxG4Av59raV_Q&s"
                                            alt="Smartwatch"
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-6">
                                            <h3 className="text-lg font-bold mb-2 truncate">Smartwatch</h3>
                                            <p className="text-gray-500 mb-4 truncate">A wearable gadget that tracks your fitness, shows notifications, and keeps you connected right on your wrist.</p>
                                            <span className="text-indigo-600 font-bold text-lg">$59.99</span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    <div className="text-center mt-12">
                        <Link 
                            href="/all-product"
                            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl inline-block"
                        >
                            View All Products
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
