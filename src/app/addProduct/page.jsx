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
    const { data: session } = useSession();

    const handleCreateEvent = async (e) => {
        e.preventDefault();

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
                setStartDate(new Date()); // date reset
                toast.success('Product added successfully!');
            } else {
                toast.error(data.message || 'Failed to add product');
            }
        } catch (error) {
            console.error('Error adding product:', error);
            toast.error('Network error. Please try again.');
        }
    };

    return (
        <ProtectedRoute>
            <div className='max-w-[1200px] mx-auto'>
                <div className="md:min-h-screen py-10 md:py-20">
                    <div className=" bg-base-100 w-full max-w-[900px] mx-auto shrink-0">
                        <form onSubmit={handleCreateEvent} className="card-body">
                            <fieldset className="fieldset">
                                <h1 className='text-3xl md:text-5xl font-bold text-blue-600 mb-2'>
                                    Add Product
                                </h1>

                                {/* title */}
                                <label className="label">Title</label>
                                <input
                                    name='title'
                                    type="text"
                                    className="input w-full"
                                    placeholder="Write your Product Title"
                                    required
                                />

                                {/* Short description */}
                                <label className="label">Short Description</label>
                                <textarea
                                    className="textarea w-full"
                                    placeholder="Write your Product Short Description..."
                                    name='shortDescription'
                                ></textarea>

                                {/* Full description */}
                                <label className="label">Full Description</label>
                                <textarea
                                    className="textarea w-full"
                                    placeholder="Write your Product Full Description..."
                                    name='fullDescription'
                                ></textarea>

                                {/* Price */}
                                <label className="label">Price</label>
                                <input
                                    name='price'
                                    type="number"
                                    className="input w-full"
                                    placeholder="Enter Product Price"
                                    required
                                />

                                {/* Product priority */}
                                <label className="label">Product Priority</label>
                                <select name='eventType' defaultValue="Select Product priority" className="select w-full">
                                    <option disabled={true}>Select Product priority</option>
                                    <option>High</option>
                                    <option>Medium</option>
                                    <option>Low</option>
                                </select>

                                {/* Product Image URL */}
                                <label className="label">Product Image URL</label>
                                <input
                                    name='thumbnailImage'
                                    type="text"
                                    className="input w-full"
                                    placeholder="Product Image URL"
                                    required
                                />

                                {/* date */}
                                <div>
                                    <label className="label flex">Date</label>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        className="input input-bordered w-full cursor-pointer"
                                        minDate={new Date()}
                                        placeholderText="Select Event Date"
                                        wrapperClassName="w-full"
                                    />
                                </div>

                                <button type='submit' className="btn btn-neutral mt-4 text-white bg-blue-600 border-0">
                                    Add Product
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>
                <ToastContainer position="top-right" />
            </div>
        </ProtectedRoute>
    )
}
