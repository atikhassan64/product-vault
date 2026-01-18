"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Swal from "sweetalert2";

export default function ManageProductTable({ events: initialEvents }) {

    const [events, setEvents] = useState(initialEvents || []);
    console.log(events)
    

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
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await fetch(`/api/products/${id}`, {
                        method: "DELETE",
                    });

                    if (!res.ok) {
                        throw new Error("Failed to delete product");
                    }

                    const data = await res.json();

                    if (data.deletedCount > 0) {
                        setEvents(prev => prev.filter(event => event._id !== id && event.id !== id));
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your product has been deleted.",
                            icon: "success",
                        });
                    } else {
                        Swal.fire({
                            title: "Failed!",
                            text: "Product could not be deleted.",
                            icon: "error",
                        });
                    }
                } catch (error) {
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
                            <tr key={event._id || event.id}>
                                <td>{event.title}</td>
                                <td>{event.date}</td>
                                <td>{event.price}</td>
                                <td>{event.eventType}</td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(event._id || event.id, event.source)}
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
                        No Products Yet
                    </p>
                )}
            </div>
        </div>
    );
}
