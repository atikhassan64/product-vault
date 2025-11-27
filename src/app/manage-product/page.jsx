"use client";

import ManageProductTable from '@/component/product/ManageProductTable';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
// import ManageEventTable from '@/component/ManageEventTable';

export default function page() {
    const [events, setEvents] = useState([]);
    const { data: session, status } = useSession();

    useEffect(() => {
    if (status !== "authenticated") return;

    const email = session.user.email;

    fetch(`http://localhost:3000/api/event?email=${email}`)
        .then(res => res.json())
        .then(eventsData => {
            const eventsWithSource = eventsData.map(e => ({
                ...e,
                source: "events"
            }));
            
            setEvents(eventsWithSource);
        })
        .catch(err => console.error("Error loading events", err));
}, [status, session]);

    return (
        <div className='max-w-[1200px] mx-auto'>
            <div className='max-w-[400px] mx-auto md:max-w-[1200px] md:mx-auto py-20'>
                <h1 className='text-3xl md:text-5xl font-bold text-blue-600 mb-3'>Manage Event</h1>
                <ManageProductTable events={events} />
            </div>
        </div>
    );
}
