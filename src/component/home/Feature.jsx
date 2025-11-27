"use client";

import React from 'react'

export default function Feature() {
    return (
        <div className='max-w-[1200px] mx-auto'>
            <div className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            What Makes ProductVault Special
                        </p>
                        <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                            Our platform offers powerful features to help you manage products effortlessly.
                        </p>
                    </div>

                    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-lg shadow p-6 text-center hover:scale-105 transition-transform">
                            <div className="text-indigo-600 mb-4">
                                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold mb-2">Easy Management</h3>
                            <p className="text-gray-500">Add, update, and organize products effortlessly in a single dashboard.</p>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6 text-center hover:scale-105 transition-transform">
                            <div className="text-indigo-600 mb-4">
                                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m-6-8h6M4 6h16v12H4z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold mb-2">Analytics</h3>
                            <p className="text-gray-500">Track your product performance with clear and interactive analytics charts.</p>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6 text-center hover:scale-105 transition-transform">
                            <div className="text-indigo-600 mb-4">
                                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422A12.083 12.083 0 0112 21.5a12.083 12.083 0 01-6.16-10.922L12 14z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold mb-2">Secure Storage</h3>
                            <p className="text-gray-500">Keep all your product data safe with encrypted cloud storage and role-based access.</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
