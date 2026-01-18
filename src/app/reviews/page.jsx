"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ReviewsPage() {
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    productId: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch products
      const productsRes = await fetch('/api/products');
      const productsData = await productsRes.json();
      setProducts(productsData);

      // Load reviews from localStorage (in production, this would be from API)
      const savedReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
      setReviews(savedReviews);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    
    if (!session) {
      toast.error('Please login to submit a review');
      return;
    }

    if (!selectedProduct || !newReview.comment.trim()) {
      toast.error('Please select a product and write a comment');
      return;
    }

    const review = {
      id: Date.now().toString(),
      productId: selectedProduct,
      userId: session.user.id,
      userName: session.user.name,
      userEmail: session.user.email,
      rating: newReview.rating,
      comment: newReview.comment.trim(),
      createdAt: new Date().toISOString()
    };

    const updatedReviews = [...reviews, review];
    setReviews(updatedReviews);
    localStorage.setItem('reviews', JSON.stringify(updatedReviews));

    // Reset form
    setNewReview({ rating: 5, comment: '', productId: '' });
    setSelectedProduct('');
    
    toast.success('Review submitted successfully!');
  };

  const getProductReviews = (productId) => {
    return reviews.filter(review => review.productId === productId);
  };

  const getAverageRating = (productId) => {
    const productReviews = getProductReviews(productId);
    if (productReviews.length === 0) return 0;
    
    const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / productReviews.length).toFixed(1);
  };

  const renderStars = (rating, interactive = false, onRatingChange = null) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? "button" : undefined}
            onClick={interactive ? () => onRatingChange(star) : undefined}
            className={`text-2xl ${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
            disabled={!interactive}
          >
            ⭐
          </button>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg text-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1200px] mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Product Reviews</h1>
          <p className="text-lg text-gray-600">Share your experience and read what others think</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Submit Review Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Write a Review</h2>
              
              {session ? (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Product
                    </label>
                    <select
                      value={selectedProduct}
                      onChange={(e) => setSelectedProduct(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Choose a product...</option>
                      {products.map((product) => (
                        <option key={product.id || product._id} value={product.id || product._id}>
                          {product.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating
                    </label>
                    {renderStars(newReview.rating, true, (rating) => 
                      setNewReview(prev => ({ ...prev, rating }))
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Review
                    </label>
                    <textarea
                      value={newReview.comment}
                      onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Share your thoughts about this product..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Submit Review
                  </button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🔒</div>
                  <p className="text-gray-600 mb-4">Please login to write a review</p>
                  <Link href="/login" className="btn bg-blue-500 text-white hover:bg-blue-600">
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Products with Reviews */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {products.map((product) => {
                const productReviews = getProductReviews(product.id || product._id);
                const averageRating = getAverageRating(product.id || product._id);
                
                return (
                  <div key={product.id || product._id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* Product Header */}
                    <div className="p-6 border-b">
                      <div className="flex items-start gap-4">
                        <img
                          src={product.thumbnailImage}
                          alt={product.title}
                          className="w-20 h-20 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/80x80?text=No+Image";
                          }}
                        />
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.title}</h3>
                          <p className="text-gray-600 text-sm mb-3">{product.shortDescription}</p>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              {renderStars(Math.round(averageRating))}
                              <span className="text-sm text-gray-600">
                                {averageRating > 0 ? `${averageRating} (${productReviews.length} reviews)` : 'No reviews yet'}
                              </span>
                            </div>
                            <span className="font-bold text-green-600">{product.price}</span>
                          </div>
                        </div>
                        <Link 
                          href={`/detail-product/${product.id || product._id}`}
                          className="btn btn-outline btn-sm"
                        >
                          View Product
                        </Link>
                      </div>
                    </div>

                    {/* Reviews */}
                    <div className="p-6">
                      {productReviews.length > 0 ? (
                        <div className="space-y-4">
                          <h4 className="font-semibold text-gray-800 mb-4">
                            Reviews ({productReviews.length})
                          </h4>
                          {productReviews.map((review) => (
                            <div key={review.id} className="border-l-4 border-blue-500 pl-4 py-2">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                  <span className="font-medium text-gray-800">{review.userName}</span>
                                  {renderStars(review.rating)}
                                </div>
                                <span className="text-sm text-gray-500">
                                  {new Date(review.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-gray-700">{review.comment}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <div className="text-4xl mb-4">💬</div>
                          <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      <ToastContainer position="top-right" />
    </div>
  );
}