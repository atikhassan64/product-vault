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
    toast.success('Removed from wishlist');
  };

  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem('wishlist');
    toast.success('Wishlist cleared');
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <div className="loading loading-spinner loading-lg text-blue-500"></div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-[1200px] mx-auto py-8 px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">My Wishlist</h1>
            {wishlist.length > 0 && (
              <button 
                onClick={clearWishlist}
                className="btn btn-outline btn-sm text-red-600 hover:bg-red-50"
              >
                Clear All
              </button>
            )}
          </div>

          {wishlist.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">💝</div>
              <h2 className="text-2xl font-semibold text-gray-600 mb-4">Your wishlist is empty</h2>
              <p className="text-gray-500 mb-8">Start adding products you love to your wishlist</p>
              <Link 
                href="/all-product"
                className="btn bg-blue-500 text-white hover:bg-blue-600"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlist.map((product) => (
                <div key={product.id || product._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative">
                    <img
                      src={product.thumbnailImage}
                      alt={product.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                      }}
                    />
                    <button
                      onClick={() => removeFromWishlist(product.id || product._id)}
                      className="absolute top-2 right-2 btn btn-circle btn-sm bg-red-500 text-white hover:bg-red-600 border-0"
                      title="Remove from wishlist"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.shortDescription}</p>
                    
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-bold text-green-600 text-lg">{product.price}</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        product.eventType === 'High' ? 'bg-red-100 text-red-800' :
                        product.eventType === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {product.eventType}
                      </span>
                    </div>
                    
                    <Link 
                      href={`/detail-product/${product.id || product._id}`}
                      className="btn bg-blue-500 text-white hover:bg-blue-600 w-full btn-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <ToastContainer position="top-right" />
      </div>
    </ProtectedRoute>
  );
}