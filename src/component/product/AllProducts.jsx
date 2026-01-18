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
  const [filterPriority, setFilterPriority] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');

  // Ensure events are set correctly on client after hydration
  useEffect(() => {
    setEvents(initialEvents || []);
  }, [initialEvents]);

  // Filter and sort events
  const filteredAndSortedEvents = events
    .filter((item) => {
      const matchesSearch = 
        item.title?.toLowerCase().includes(search.toLowerCase()) ||
        item.shortDescription?.toLowerCase().includes(search.toLowerCase());
      const matchesPriority = filterPriority === 'all' || item.eventType === filterPriority;
      return matchesSearch && matchesPriority;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date) - new Date(a.date);
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'price-low':
          return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
        case 'price-high':
          return parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''));
        case 'name':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const getPriorityBadge = (priority) => {
    const badges = {
      'High': 'bg-red-100 text-red-800 border-red-200',
      'Medium': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Low': 'bg-green-100 text-green-800 border-green-200'
    };
    
    const icons = {
      'High': '🔴',
      'Medium': '🟡',
      'Low': '🟢'
    };

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${badges[priority] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
        <span className="mr-1">{icons[priority]}</span>
        {priority}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Discover Amazing Products
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of high-quality products designed to meet your needs and exceed your expectations.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{events.length}</div>
              <div className="text-sm text-gray-600">Total Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">{events.filter(e => e.eventType === 'High').length}</div>
              <div className="text-sm text-gray-600">High Priority</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">{events.filter(e => e.eventType === 'Medium').length}</div>
              <div className="text-sm text-gray-600">Medium Priority</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{events.filter(e => e.eventType === 'Low').length}</div>
              <div className="text-sm text-gray-600">Low Priority</div>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="all">All Priorities</option>
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Name A-Z</option>
                <option value="price-low">Price Low-High</option>
                <option value="price-high">Price High-Low</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-3 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors duration-200`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-3 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors duration-200`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Results Info */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600">
              Showing {filteredAndSortedEvents.length} of {events.length} products
              {search && ` matching "${search}"`}
              {filterPriority !== 'all' && ` with ${filterPriority} priority`}
            </p>
          </div>
        </div>

        {/* Products Grid/List */}
        {filteredAndSortedEvents.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
            : "space-y-6"
          }>
            {filteredAndSortedEvents.map((item) => (
              <div
                key={item._id || item.id}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group ${
                  viewMode === 'list' ? 'flex flex-col md:flex-row' : 'flex flex-col'
                }`}
              >
                {/* Image */}
                <div className={`${viewMode === 'list' ? 'md:w-64 md:flex-shrink-0' : ''} relative overflow-hidden`}>
                  <div className={`${viewMode === 'list' ? 'h-48 md:h-full' : 'h-48'} bg-gray-100 flex items-center justify-center`}>
                    {item.thumbnailImage ? (
                      <img
                        src={item.thumbnailImage}
                        alt={item.title || "Product Image"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                        }}
                      />
                    ) : (
                      <div className="text-gray-400">
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  {/* Priority Badge */}
                  <div className="absolute top-3 left-3">
                    {getPriorityBadge(item.eventType)}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 truncate group-hover:text-blue-600 transition-colors duration-200">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 truncate">
                      {item.shortDescription}
                    </p>
                  </div>

                  {/* Price and Date */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-green-600">{item.price}</span>
                    <span className="text-sm text-gray-500">{formatDate(item.date)}</span>
                  </div>

                  {/* Action Button */}
                  <Link
                    href={`/detail-product/${item._id || item.id}`}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 text-center shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                  >
                    <span>View Details</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No Products Found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {search || filterPriority !== 'all' 
                ? "Try adjusting your search or filter criteria to find what you're looking for."
                : "No products are available at the moment. Check back later for new additions!"
              }
            </p>
            {(search || filterPriority !== 'all') && (
              <button
                onClick={() => {
                  setSearch('');
                  setFilterPriority('all');
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* Call to Action */}
        {events.length > 0 && (
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                We're constantly adding new products to our collection. Contact us if you have specific requirements or suggestions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/support"
                  className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors duration-200"
                >
                  Contact Support
                </Link>
                <Link
                  href="/addProduct"
                  className="px-6 py-3 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-colors duration-200 border border-white/30"
                >
                  Add Your Product
                </Link>
              </div>
            </div>
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
