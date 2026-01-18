"use client";

import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from '@/component/ProtectedRoute';
import { useSession } from 'next-auth/react';

export default function AddProductPage() {
    const [startDate, setStartDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState('');
    const { data: session } = useSession();

    const handleImageUrlChange = (e) => {
        setImagePreview(e.target.value);
    };

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const title = e.target.title.value;
        const shortDescription = e.target.shortDescription.value;
        const fullDescription = e.target.fullDescription.value;
        const price = e.target.price.value;
        const eventType = e.target.eventType.value;
        const thumbnailImage = e.target.thumbnailImage.value;
        const date = startDate.toISOString().split('T')[0];

        const newProduct = {
            title: title,
            shortDescription: shortDescription,
            fullDescription: fullDescription,
            price: price,
            eventType: eventType,
            thumbnailImage: thumbnailImage,
            date: date
        };

        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProduct)
            });

            const data = await res.json();

            if (res.ok) {
                e.target.reset();
                setStartDate(new Date());
                setImagePreview('');
                toast.success('Product added successfully!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } else {
                toast.error(data.message || 'Failed to add product');
            }
        } catch (error) {
            console.error('Error adding product:', error);
            toast.error('Network error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                            Add New Product
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Create a new product listing with detailed information to showcase your inventory effectively.
                        </p>
                    </div>

                    {/* Main Form Card */}
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                            {/* Form Section */}
                            <div className="lg:col-span-2 p-8 lg:p-12">
                                <form onSubmit={handleCreateEvent} className="space-y-8">
                                    {/* Product Title */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Product Title *
                                        </label>
                                        <input
                                            name="title"
                                            type="text"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                                            placeholder="Enter your product title"
                                            required
                                        />
                                    </div>

                                    {/* Price and Priority Row */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Price *
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">$</span>
                                                <input
                                                    name="price"
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
                                                    placeholder="0.00"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Priority Level *
                                            </label>
                                            <select 
                                                name="eventType" 
                                                defaultValue="" 
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-white"
                                                required
                                            >
                                                <option value="" disabled>Select priority level</option>
                                                <option value="High">🔴 High Priority</option>
                                                <option value="Medium">🟡 Medium Priority</option>
                                                <option value="Low">🟢 Low Priority</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Short Description */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Short Description
                                        </label>
                                        <textarea
                                            name="shortDescription"
                                            rows={3}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 resize-none"
                                            placeholder="Brief description of your product (2-3 sentences)"
                                        />
                                    </div>

                                    {/* Full Description */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Detailed Description
                                        </label>
                                        <textarea
                                            name="fullDescription"
                                            rows={5}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 resize-none"
                                            placeholder="Provide detailed information about your product, including features, specifications, and benefits..."
                                        />
                                    </div>

                                    {/* Image URL and Date Row */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Product Image URL *
                                            </label>
                                            <input
                                                name="thumbnailImage"
                                                type="url"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                                                placeholder="https://example.com/image.jpg"
                                                onChange={handleImageUrlChange}
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Launch Date *
                                            </label>
                                            <DatePicker
                                                selected={startDate}
                                                onChange={(date) => setStartDate(date)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 cursor-pointer"
                                                minDate={new Date()}
                                                placeholderText="Select launch date"
                                                dateFormat="MMMM d, yyyy"
                                            />
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-6">
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
                                        >
                                            {isLoading ? (
                                                <>
                                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    <span>Adding Product...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>
                                                    <span>Add Product</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Preview Section */}
                            <div className="lg:col-span-1 bg-gradient-to-br from-gray-50 to-blue-50 p-8 lg:p-12 border-l border-gray-100">
                                <div className="sticky top-8">
                                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        Preview
                                    </h3>
                                    
                                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                        {imagePreview ? (
                                            <img
                                                src={imagePreview}
                                                alt="Product preview"
                                                className="w-full h-48 object-cover"
                                                onError={(e) => {
                                                    e.target.src = "https://via.placeholder.com/400x300?text=Invalid+Image+URL";
                                                }}
                                            />
                                        ) : (
                                            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                                                <div className="text-center text-gray-500">
                                                    <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    <p className="text-sm">Image preview will appear here</p>
                                                </div>
                                            </div>
                                        )}
                                        
                                        <div className="p-6">
                                            <h4 className="font-semibold text-gray-900 mb-2">Product Preview</h4>
                                            <p className="text-sm text-gray-600 mb-4">
                                                This is how your product will appear to customers. Make sure all information is accurate and appealing.
                                            </p>
                                            
                                            <div className="space-y-3 text-sm">
                                                <div className="flex items-center text-gray-600">
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    High-quality images recommended
                                                </div>
                                                <div className="flex items-center text-gray-600">
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    Clear, descriptive titles work best
                                                </div>
                                                <div className="flex items-center text-gray-600">
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    Include detailed descriptions
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quick Actions */}
                                    <div className="mt-6 space-y-3">
                                        <a
                                            href="/all-product"
                                            className="block w-full text-center px-4 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors duration-200"
                                        >
                                            View All Products
                                        </a>
                                        <a
                                            href="/manage-product"
                                            className="block w-full text-center px-4 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors duration-200"
                                        >
                                            Manage Products
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <ToastContainer 
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </div>
        </ProtectedRoute>
    )
}
