"use client";

import React, { useState } from 'react';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        {
            question: "How do I get started with ProductVault?",
            answer: "Getting started is easy! Simply sign up for a free account, and you can immediately start adding your products. Our intuitive interface guides you through the process, and you'll be managing your inventory in minutes."
        },
        {
            question: "Can I import my existing product data?",
            answer: "Yes! ProductVault supports importing data from CSV files, Excel spreadsheets, and popular e-commerce platforms. Our import wizard makes it simple to migrate your existing product catalog."
        },
        {
            question: "Is my data secure with ProductVault?",
            answer: "Absolutely. We use enterprise-grade security measures including SSL encryption, regular backups, and secure data centers. Your product information is protected with the same security standards used by major financial institutions."
        },
        {
            question: "Can I collaborate with my team?",
            answer: "Yes! Professional and Enterprise plans include team collaboration features. You can invite team members, set different permission levels, and work together on product management tasks."
        },
        {
            question: "What kind of analytics do you provide?",
            answer: "ProductVault offers comprehensive analytics including product performance metrics, inventory trends, sales insights, and custom reports. You can track which products are performing best and make data-driven decisions."
        },
        {
            question: "Do you offer customer support?",
            answer: "We provide multiple support channels: email support for all users, priority support for Professional plans, and dedicated account managers for Enterprise customers. Our support team is knowledgeable and responsive."
        },
        {
            question: "Can I cancel my subscription anytime?",
            answer: "Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees. If you cancel, you'll continue to have access until the end of your current billing period."
        },
        {
            question: "Is there a mobile app available?",
            answer: "Yes! ProductVault has mobile apps for both iOS and Android. You can manage your products, check inventory, and access analytics on the go. The mobile app syncs seamlessly with the web platform."
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <section className="bg-white py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Got questions? We've got answers. If you can't find what you're looking for, feel free to contact our support team.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                            <button
                                className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center"
                                onClick={() => toggleFAQ(index)}
                            >
                                <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                                <svg
                                    className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                                        openIndex === index ? 'rotate-180' : ''
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ${
                                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                            >
                                <div className="px-6 py-4 bg-white border-t border-gray-100">
                                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h3>
                        <p className="text-gray-600 mb-6">
                            Our support team is here to help you get the most out of ProductVault.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/support"
                                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                            >
                                Contact Support
                            </a>
                            <a
                                href="/blog"
                                className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200"
                            >
                                Visit Help Center
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}