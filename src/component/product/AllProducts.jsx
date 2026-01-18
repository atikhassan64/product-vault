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

  // Filter events based on search
  const filteredEvents = events.filter((item) =>
    item.title?.toLowerCase().includes(search.toLowerCase()) ||
    item.shortDescription?.toLowerCase().includes(search.toLowerCase())
  );

  // Ensure events are set correctly on client after hydration
  useEffect(() => {
    setEvents(initialEvents || []);
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

      {/* Search */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-10">
        <input
          type="text"
          placeholder="Search products..."
          className="border rounded px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Item Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((item) => (
            <div
              key={item._id || item.id}
              className="border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col bg-white"
            >
              {/* Image */}
              {item.thumbnailImage && (
                <div className="h-48 bg-gray-100 mb-4 flex items-center justify-center overflow-hidden rounded">
                  <img
                    src={item.thumbnailImage}
                    alt={item.title || "Product Image"}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                    }}
                  />
                </div>
              )}

              {/* Title */}
              <h2 className="text-xl font-bold mb-2 text-gray-800">{item.title}</h2>

              {/* Short Description */}
              <p className="text-gray-600 mb-3 flex-grow line-clamp-3">
                {item.shortDescription}
              </p>

              {/* Price and Priority */}
              <div className="flex justify-between items-center mb-4">
                <p className="font-semibold text-lg text-green-600">{item.price}</p>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  item.eventType === 'High' ? 'bg-red-100 text-red-800' :
                  item.eventType === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {item.eventType} Priority
                </span>
              </div>

              {/* Details Button */}
              <Link
                href={`/detail-product/${item._id || item.id}`}
                className="mt-auto btn bg-blue-500 text-white py-2 rounded text-center hover:bg-blue-600 transition-colors"
              >
                View Details
              </Link>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
            <p className="text-gray-500">
              {search ? `No products match "${search}"` : "No products available at the moment"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}


// "use client";

// import React, { useState } from "react";
// import Link from "next/link";

// export default function AllProducts({ events }) {
//   const [search, setSearch] = useState("");

//   // Filter logic
//   const filteredEvents = events.filter((item) =>
//     item.title?.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="max-w-[1200px] mx-auto py-20 px-4">
//       {/* Page Title */}
//       <h1 className="text-4xl font-bold text-center text-blue-500 mb-2">
//         Our Products
//       </h1>
//       <p className="text-center text-lg mb-10">
//         Browse our collection of amazing products below.
//       </p>

//       {/* Search */}
//       <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-10">
//         <input
//           type="text"
//           placeholder="Search products..."
//           className="border rounded px-4 py-2 w-full md:w-1/3"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {/* Item Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {filteredEvents.length > 0 ? (
//           filteredEvents.map((item) => (
//             <div
//               key={item._id}
//               className="border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col"
//             >
//               {/* Image */}
//               {item.thumbnailImage && (
//                 <div className="h-48 bg-gray-100 mb-4 flex items-center justify-center overflow-hidden">
//                   <img
//                     src={item.thumbnailImage}
//                     alt={item.title}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               )}

//               {/* Title */}
//               <h2 className="text-xl font-bold mb-1">{item.title}</h2>

//               {/* Short Description */}
//               <p className="text-gray-600 mb-2 line-clamp-2">
//                 {item.shortDescription}
//               </p>

//               {/* Price */}
//               <p className="font-semibold mb-4">{item.price}</p>

//               {/* Details Button */}
//               <Link
//                 href={`/detail-product/${item._id}`}
//                 className="mt-auto btn bg-blue-500 text-white py-2 rounded text-center"
//               >
//                 Details
//               </Link>
//             </div>
//           ))
//         ) : (
//           <p className="col-span-full text-center text-gray-500 text-lg py-10">
//             No products found.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }
