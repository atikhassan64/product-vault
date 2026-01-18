"use client";

import React from 'react';

export default function Statistics() {
    const stats = [
        {
            number: "10,000+",
            label: "Products Managed",
            icon: "📦",
            description: "Successfully organized and tracked"
        },
        {
            number: "5,000+",
            label: "Happy Users",
            icon: "👥",
            description: "Businesses trust our platform"
        },
        {
            number: "99.9%",
            label: "Uptime",
            icon: "⚡",
            description: "Reliable service guarantee"
        },
        {
            number: "24/7",
            label: "Support",
            icon: "🎧",
            description: "Always here to help you"
        }
    ];

    return (
        <section className="bg-gradient-to-r from-blue-600 to-purple-700 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Trusted by Thousands
                    </h2>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Join the growing community of businesses that rely on ProductVault for their product management needs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center group">
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
                                <div className="text-4xl mb-4">{stat.icon}</div>
                                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-lg font-semibold text-blue-100 mb-2">
                                    {stat.label}
                                </div>
                                <div className="text-sm text-blue-200">
                                    {stat.description}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                        <span className="text-white font-medium">🚀 Growing fast:</span>
                        <span className="text-blue-200">+500 new users this month</span>
                    </div>
                </div>
            </div>
        </section>
    );
}