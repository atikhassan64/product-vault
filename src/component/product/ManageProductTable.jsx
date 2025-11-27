"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Swal from "sweetalert2";

export default function ManageProductTable({ events: initialEvents }) {

    const [events, setEvents] = useState(initialEvents || []);
    

    useEffect(() => {
        setEvents(initialEvents);
    }, [initialEvents]);

     const handleDelete = (id, source) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {  // ✅ CHANGED: make async for fetch/await
            if (result.isConfirmed) {
                try { // ✅ CHANGED: added try/catch for error handling
                    const res = await fetch(`/api/event/${id}`, {  // ✅ CHANGED: await fetch
                        method: "DELETE",
                    });

                    if (!res.ok) { // ✅ CHANGED: check HTTP status
                        throw new Error("Failed to delete event");
                    }

                    const data = await res.json(); // ✅ CHANGED: await res.json()

                    if (data.deletedCount > 0) {
                        setEvents(prev => prev.filter(event => event._id !== id)); // ✅ CHANGED: safer state update
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success",
                        });
                    } else {
                        Swal.fire({
                            title: "Failed!",
                            text: "Event could not be deleted.",
                            icon: "error",
                        });
                    }
                } catch (error) { // ✅ CHANGED: catch network or server errors
                    console.error(error);
                    Swal.fire({
                        title: "Error!",
                        text: "Something went wrong.",
                        icon: "error",
                    });
                }
            }
        });
    };

    return (
        <div>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Product priority</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {events.map((event) => (
                            <tr key={event._id}>
                                {console.log("id is :", events._id)}
                                <td>{event.title}</td>
                                <td>{event.date}</td>
                                <td>{event.price}</td>
                                <td>{event.eventType}</td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(event._id, event.source)}
                                        className="btn bg-red-500 text-white"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {events.length === 0 && (
                    <p className="text-center text-xl font-semibold py-10 text-gray-500">
                        No Events Yet
                    </p>
                )}
            </div>
        </div>
    );
}
