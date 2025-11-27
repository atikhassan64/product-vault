"use client";
import React from 'react'

export default function Items() {
    return (
        <div className='bg-gray-50 py-16'>
            <div className="max-w-[1200px] mx-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Explore Our Products
                        </p>
                        <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                            Browse through our featured items with descriptions and pricing.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {/* Item 1 */}
                        <div className="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden transition-shadow">
                            <img
                                src="https://i.rtings.com/assets/pages/6S2WXjTl/best-laptops-20240516-medium.jpg?format=auto"
                                alt="Item 1"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-lg font-bold mb-2">Laptop</h3>
                                <p className="text-gray-500 mb-4">A portable computer with a built-in screen, keyboard, and battery, perfect for work, study, and entertainment anywhere.</p>
                                <span className="text-indigo-600 font-bold text-lg">$29.99</span>
                            </div>
                        </div>

                        {/* Item 2 */}
                        <div className="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden transition-shadow">
                            <img
                                src="https://www.techspot.com/articles-info/2988/images/2025-05-19-image-2.jpg"
                                alt="Item 2"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-lg font-bold mb-2">Smartphone</h3>
                                <p className="text-gray-500 mb-4">A handheld device that combines calling, internet access, and apps in one compact gadget for everyday connectivity.</p>
                                <span className="text-indigo-600 font-bold text-lg">$39.99</span>
                            </div>
                        </div>

                        {/* Item 3 */}
                        <div className="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden transition-shadow">
                            <img
                                src="https://halalbari.com/uslive/pnism/10644_img_2021_11_29_050518_64236929.webp"
                                alt="Item 3"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-lg font-bold mb-2">Wireless Headphones</h3>
                                <p className="text-gray-500 mb-4">High-quality headphones with Bluetooth connectivity, providing freedom from wires and immersive sound experience.</p>
                                <span className="text-indigo-600 font-bold text-lg">$49.99</span>
                            </div>
                        </div>

                        {/* Item 4 */}
                        <div className="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden transition-shadow">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgVXDVZ-1c6wK_G9DOCD1MAHxG4Av59raV_Q&s"
                                alt="Item 4"
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-lg font-bold mb-2">Smartwatch</h3>
                                <p className="text-gray-500 mb-4">A wearable gadget that tracks your fitness, shows notifications, and keeps you connected right on your wrist.</p>
                                <span className="text-indigo-600 font-bold text-lg">$59.99</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
