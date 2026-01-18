"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from '@/component/ProtectedRoute';

export default function WishlistPage() {
  const { data: session } = useSession();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    if (session) {
      const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setWishlist(savedWishlist);
    }
    setLoading(false);
  }, [session]);

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter(item => 
      item.id !== productId && item._id !== productId
    );
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    toast.success('Removed from wishlist', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const clearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      setWishlist([]);
      localStorage.removeItem('wishlist');
      toast.success('Wishlist cleared successfully', {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const addToCart = (product) => {
    // Simulate adding to cart
    toast.success(`${product.title} added to cart!`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  // Sort wishlist items
  const sortedWishlist = [...wishlist].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.dateAdded || b.date) - new Date(a.dateAdded || a.date);
      case 'oldest':
        return new Date(a.dateAdded || a.date) - new Date(b.dateAdded || b.date);
      case 'name':
        return a.title.localeCompare(b.title);
      case 'price-low':
        return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
      case 'price-high':
        return parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''));
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

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="text-center">
            <div className="loading loading-spinner loading-lg text-blue-500 mb-4"></div>
            <p className="text-gray-600 font-medium">Loading your wishlist...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-red-600 rounded-2xl mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent mb-4">
                My Wishlist
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Keep track of products you love and want to purchase later. Your personal collection of favorites.
              </p>
            </div>

            {wishlist.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-pink-100 to-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-16 h-16 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Start building your dream collection by adding products you love to your wishlist. 
                  It's the perfect way to save items for later!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/all-product"
                    className="px-8 py-4 bg-gradient-to-r from-pink-500 to-red-600 text-white font-semibold rounded-2xl hover:from-pink-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Discover Products
                  </Link>
                  <Link 
                    href="/categories"
                    className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-2xl hover:bg-gray-50 transition-all duration-200 shadow-lg border border-gray-200"
                  >
                    Browse Categories
                  </Link>
                </div>
              </div>
            ) : (
              <>
                {/* Controls Bar */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    {/* Stats */}
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{wishlist.length}</div>
                        <div className="text-sm text-gray-600">Items</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          ${wishlist.reduce((total, item) => total + parseFloat(item.price.replace('$', '')), 0).toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-600">Total Value</div>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white"
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
                          className={`px-4 py-3 ${viewMode === 'grid' ? 'bg-pink-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors duration-200`}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setViewMode('list')}
                          className={`px-4 py-3 ${viewMode === 'list' ? 'bg-pink-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors duration-200`}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                          </svg>
                        </button>
                      </div>

                      <button 
                        onClick={clearWishlist}
                        className="px-6 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span>Clear All</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Products Grid/List */}
                <div className={viewMode === 'grid' 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                  : "space-y-6"
                }>
                  {sortedWishlist.map((product) => (
                    <div
                      key={product.id || product._id}
                      className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group ${
                        viewMode === 'list' ? 'flex flex-col md:flex-row' : 'flex flex-col'
                      }`}
                    >
                      {/* Image */}
                      <div className={`${viewMode === 'list' ? 'md:w-64 md:flex-shrink-0' : ''} relative overflow-hidden`}>
                        <div className={`${viewMode === 'list' ? 'h-48 md:h-full' : 'h-48'} bg-gray-100 flex items-center justify-center`}>
                          <img
                            src={product.thumbnailImage}
                            alt={product.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                            }}
                          />
                        </div>
                        
                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromWishlist(product.id || product._id)}
                          className="absolute top-3 right-3 w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 flex items-center justify-center shadow-lg"
                          title="Remove from wishlist"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>

                        {/* Priority Badge */}
                        <div className="absolute top-3 left-3">
                          {getPriorityBadge(product.eventType)}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex-grow">
                          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors duration-200">
                            {product.title}
                          </h3>
                          
                          <p className="text-gray-600 mb-4 line-clamp-3">
                            {product.shortDescription}
                          </p>
                        </div>

                        {/* Price */}
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-2xl font-bold text-green-600">{product.price}</span>
                          <span className="text-sm text-gray-500">
                            Added {new Date(product.dateAdded || product.date).toLocaleDateString()}
                          </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          <Link
                            href={`/detail-product/${product.id || product._id}`}
                            className="flex-1 bg-gradient-to-r from-pink-500 to-red-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-pink-600 hover:to-red-700 transition-all duration-200 text-center shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                          >
                            <span>View Details</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                          
                          <button
                            onClick={() => addToCart(product)}
                            className="px-4 py-3 bg-white text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 border border-gray-200 shadow-lg hover:shadow-xl"
                            title="Add to cart"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Call to Action */}
                <div className="mt-16 text-center">
                  <div className="bg-gradient-to-r from-pink-500 to-red-600 rounded-3xl p-8 text-white">
                    <h3 className="text-2xl font-bold mb-4">Love what you see?</h3>
                    <p className="text-pink-100 mb-6 max-w-2xl mx-auto">
                      Don't let your favorite items slip away. Many of these products have limited availability and high demand.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link
                        href="/all-product"
                        className="px-6 py-3 bg-white text-pink-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors duration-200"
                      >
                        Discover More Products
                      </Link>
                      <button
                        onClick={() => {
                          // Simulate adding all to cart
                          toast.success(`Added ${wishlist.length} items to cart!`);
                        }}
                        className="px-6 py-3 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-colors duration-200 border border-white/30"
                      >
                        Add All to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
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
  );
}