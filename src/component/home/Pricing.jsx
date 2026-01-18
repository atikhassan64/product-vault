"use client";

import React from 'react';
import Link from 'next/link';

export default function Pricing() {
    const plans = [
        {
            name: "Starter",
            price: "Free",
            period: "Forever",
            description: "Perfect for small businesses getting started",
            features: [
                "Up to 100 products",
                "Basic analytics",
                "Email support",
                "Mobile app access",
                "Standard templates"
            ],
            popular: false,
            buttonText: "Get Started",
            buttonStyle: "px-6 py-4 bg-white text-gray-900 font-semibold rounded-2xl hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl"
        },
        {
            name: "Professional",
            price: "$29",
            period: "per month",
            description: "Ideal for growing businesses with advanced needs",
            features: [
                "Unlimited products",
                "Advanced analytics",
                "Priority support",
                "API access",
                "Custom templates",
                "Team collaboration",
                "Export/Import tools"
            ],
            popular: true,
            buttonText: "Start Free Trial",
            buttonStyle: "px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        },
        {
            name: "Enterprise",
            price: "$99",
            period: "per month",
            description: "For large organizations with custom requirements",
            features: [
                "Everything in Professional",
                "Dedicated account manager",
                "Custom integrations",
                "Advanced security",
                "SLA guarantee",
                "White-label options",
                "Custom training"
            ],
            popular: false,
            buttonText: "Contact Sales",
            buttonStyle: "px-6 py-4 bg-white text-gray-900 font-semibold rounded-2xl hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl"
        }
    ];

    return (
        <section className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Choose the perfect plan for your business. Start free and upgrade as you grow.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, index) => (
                        <div key={index} className={`relative bg-white rounded-2xl shadow-lg overflow-hidden ${plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''}`}>
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                                        Most Popular
                                    </span>
                                </div>
                            )}
                            
                            <div className="p-8">
                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                    <p className="text-gray-600 mb-4">{plan.description}</p>
                                    <div className="flex items-baseline justify-center">
                                        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                                        {plan.period !== "Forever" && (
                                            <span className="text-gray-600 ml-2">/{plan.period}</span>
                                        )}
                                    </div>
                                    {plan.period === "Forever" && (
                                        <span className="text-green-600 font-medium">No credit card required</span>
                                    )}
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-center">
                                            <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href="/register"
                                    className={`w-full block text-center ${plan.buttonStyle}`}
                                >
                                    {plan.buttonText}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-gray-600 mb-4">All plans include:</p>
                    <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-700">
                        <span className="flex items-center">
                            <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            SSL Security
                        </span>
                        <span className="flex items-center">
                            <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Regular Backups
                        </span>
                        <span className="flex items-center">
                            <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            99.9% Uptime
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}