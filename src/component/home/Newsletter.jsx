"use client";

import React, { useState } from 'react';

export default function Newsletter() {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Simulate API call
        setTimeout(() => {
            setIsSubscribed(true);
            setIsLoading(false);
            setEmail('');
        }, 1000);
    };

    const benefits = [
        {
            icon: "📧",
            title: "Weekly Updates",
            description: "Get the latest product management tips and platform updates"
        },
        {
            icon: "🎯",
            title: "Exclusive Features",
            description: "Be the first to access new features and beta releases"
        },
        {
            icon: "💡",
            title: "Expert Insights",
            description: "Learn from industry experts and successful case studies"
        },
        {
            icon: "🎁",
            title: "Special Offers",
            description: "Receive exclusive discounts and promotional offers"
        }
    ];

    return (
        <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left side - Content */}
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Stay Updated with ProductVault
                        </h2>
                        <p className="text-xl text-gray-300 mb-8">
                            Join thousands of product managers who get our weekly newsletter with tips, 
                            updates, and exclusive insights to help grow their business.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex items-start space-x-3">
                                    <div className="text-2xl">{benefit.icon}</div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-1">{benefit.title}</h3>
                                        <p className="text-sm text-gray-400">{benefit.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right side - Newsletter Form */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                        {!isSubscribed ? (
                            <>
                                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                                    Subscribe to Our Newsletter
                                </h3>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email address"
                                            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 px-6 rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl"
                                    >
                                        {isLoading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Subscribing...
                                            </>
                                        ) : (
                                            'Subscribe Now'
                                        )}
                                    </button>
                                </form>
                                <p className="text-xs text-gray-400 mt-4 text-center">
                                    We respect your privacy. Unsubscribe at any time.
                                </p>
                            </>
                        ) : (
                            <div className="text-center">
                                <div className="text-6xl mb-4">🎉</div>
                                <h3 className="text-2xl font-bold text-white mb-4">
                                    Welcome to the Community!
                                </h3>
                                <p className="text-gray-300 mb-6">
                                    Thank you for subscribing! You'll receive your first newsletter within the next few days.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <a
                                        href="/all-product"
                                        className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 px-6 rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 text-center shadow-lg hover:shadow-xl"
                                    >
                                        Explore Products
                                    </a>
                                    <a
                                        href="/register"
                                        className="flex-1 border border-white/30 text-white font-semibold py-4 px-6 rounded-2xl hover:bg-white/10 transition-all duration-200 text-center backdrop-blur-sm"
                                    >
                                        Create Account
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <div className="inline-flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-full px-8 py-4">
                        <div className="flex -space-x-2">
                            <img className="w-8 h-8 rounded-full border-2 border-white" src="https://ui-avatars.com/api/?name=John+Doe&background=3b82f6&color=fff" alt="User 1" />
                            <img className="w-8 h-8 rounded-full border-2 border-white" src="https://ui-avatars.com/api/?name=Jane+Smith&background=8b5cf6&color=fff" alt="User 2" />
                            <img className="w-8 h-8 rounded-full border-2 border-white" src="https://ui-avatars.com/api/?name=Mike+Johnson&background=10b981&color=fff" alt="User 3" />
                            <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-600 flex items-center justify-center text-xs text-white font-medium">
                                +5K
                            </div>
                        </div>
                        <span className="text-white font-medium">Join 5,000+ subscribers already getting our updates</span>
                    </div>
                </div>
            </div>
        </section>
    );
}