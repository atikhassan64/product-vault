"use client";

import ManageProductTable from '@/component/product/ManageProductTable';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import ProtectedRoute from '@/component/ProtectedRoute';

export default function ManageProductPage() {
    const [events, setEvents] = useState([]);
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status !== "authenticated") return;

        const fetchProducts = async () => {
            try {
                const res = await fetch(`/api/products?email=${session.user.email}`);
                const products = await res.json();
                
                const eventsWithSource = products.map(e => ({
                    ...e,
                    source: "products"
                }));
                
                setEvents(eventsWithSource);
            } catch (error) {
                console.error("Error loading products:", error);
            }
        };

        fetchProducts();
    }, [status, session]);

    return (
        <ProtectedRoute>
            <div className='max-w-[1200px] mx-auto'>
                <div className='max-w-[400px] mx-auto md:max-w-[1200px] md:mx-auto py-20'>
                    <h1 className='text-3xl md:text-5xl font-bold text-blue-600 mb-3'>Manage Products</h1>
                    <ManageProductTable events={events} />
                </div>
            </div>
        </ProtectedRoute>
    );
}
