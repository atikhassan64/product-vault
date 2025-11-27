// "use client";

// import React, { useState } from "react";
// import Link from "next/link";

// export default function AllProducts({ events }) {
//     const [search, setSearch] = useState("");

//     return (
//         <div className="max-w-[1200px] mx-auto py-20 px-4">
//             {/* Page Title */}
//             <h1 className="text-4xl font-bold text-center text-blue-500 mb-2">Our Products</h1>
//             <p className="text-center text-lg mb-10">Browse our collection of amazing products below.</p>

//             {/* Search + Filter */}
//             <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-10">
//                 <input
//                     type="text"
//                     placeholder="Search products..."
//                     className="border rounded px-4 py-2 w-full md:w-1/3"
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                 />
                
//             </div>

//             {/* Item Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {events.map((item) => (
//                     <div
//                         key={item._id}
//                         className="border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col"
//                     >
//                         {/* Image */}
//                         <div className="h-48 bg-gray-100 mb-4 flex items-center justify-center overflow-hidden">
//                             <img src={item.thumbnailImage} alt={item.title} className="w-full h-full object-cover" />
//                         </div>

//                         {/* Title */}
//                         <h2 className="text-xl font-bold mb-1">{item.title}</h2>

//                         {/* Short Description */}
//                         <p className="text-gray-600 mb-2 line-clamp-2">{item.shortDescription}</p>

//                         {/* Price/Meta */}
//                         <p className="font-semibold mb-4">{item.price}</p>

//                         {/* Details Button */}
//                         <Link
//                             href={`/detail-product/${item.id}`}
//                             className="mt-auto btn bg-blue-500 text-white py-2 rounded text-center"
//                         >
//                             Details
//                         </Link>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }


"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function AllProducts({ events: initialEvents }) {
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState(initialEvents || []);

  // Optional: filter events based on search
  const filteredEvents = events.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  // Ensure events are set correctly on client after hydration
  useEffect(() => {
    setEvents(initialEvents);
  }, [initialEvents]);

  return (
    <div className="max-w-[1200px] mx-auto py-20 px-4">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center text-blue-500 mb-2">
        Our Products
      </h1>
      <p className="text-center text-lg mb-10">
        Browse our collection of amazing products below.
      </p>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-10">
        <input
          type="text"
          placeholder="Search products..."
          className="border rounded px-4 py-2 w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Item Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((item) => (
            <div
              key={item._id}
              className="border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col"
            >
              {/* Image */}
              {item.thumbnailImage && (
                <div className="h-48 bg-gray-100 mb-4 flex items-center justify-center overflow-hidden">
                  <img
                    src={item.thumbnailImage}
                    alt={item.title || "Product Image"}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Title */}
              <h2 className="text-xl font-bold mb-1">{item.title}</h2>

              {/* Short Description */}
              <p className="text-gray-600 mb-2 line-clamp-2">
                {item.shortDescription}
              </p>

              {/* Price/Meta */}
              <p className="font-semibold mb-4">{item.price}</p>

              {/* Details Button */}
              <Link
                href={`/detail-product/${item._id}`}
                className="mt-auto btn bg-blue-500 text-white py-2 rounded text-center"
              >
                Details
              </Link>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg py-10">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
}
