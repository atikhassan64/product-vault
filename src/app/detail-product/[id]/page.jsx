"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [imageLoading, setImageLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const fetchRelatedProducts = useCallback(async (priority) => {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const allProducts = await res.json();
        // Filter out current product and get related ones
        const related = allProducts
          .filter(p => p.id !== id && p._id !== id)
          .filter(p => p.eventType === priority)
          .slice(0, 3);
        
        // If not enough related products, add random ones
        if (related.length < 3) {
          const remaining = allProducts
            .filter(p => p.id !== id && p._id !== id && p.eventType !== priority)
            .slice(0, 3 - related.length);
          related.push(...remaining);
        }
        
        setRelatedProducts(related);
      }
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) {
          throw new Error('Product not found');
        }
        const data = await res.json();
        setProduct(data);
        
        // Fetch related products
        fetchRelatedProducts(data.eventType);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, fetchRelatedProducts]);

  const handleContactSeller = () => {
    if (!session) {
      toast.info("Please login to contact the seller");
      router.push("/login");
      return;
    }
    
    // Simulate contact functionality
    Swal.fire({
      title: 'Contact Seller',
      html: `
        <div class="text-left">
          <p class="mb-4">Send a message to the seller about <strong>${product.title}</strong></p>
          <textarea 
            id="message" 
            class="w-full p-3 border rounded-lg" 
            rows="4" 
            placeholder="Hi, I'm interested in your product..."
          ></textarea>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Send Message',
      confirmButtonColor: '#3B82F6',
      preConfirm: () => {
        const message = document.getElementById('message').value;
        if (!message.trim()) {
          Swal.showValidationMessage('Please enter a message');
          return false;
        }
        return message;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        toast.success("Message sent to seller!");
      }
    });
  };

  const handleAddToWishlist = () => {
    if (!session) {
      toast.info("Please login to add to wishlist");
      router.push("/login");
      return;
    }
    
    // Simulate wishlist functionality
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const isAlreadyInWishlist = wishlist.some(item => item.id === product.id || item._id === product._id);
    
    if (isAlreadyInWishlist) {
      toast.info("Product is already in your wishlist");
    } else {
      wishlist.push(product);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      toast.success("Added to wishlist!");
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: product.shortDescription,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success("Product link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">{error || "The product you're looking for doesn't exist."}</p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/all-product"
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Browse Products
            </Link>
            <button 
              onClick={() => router.back()}
              className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl border border-gray-200"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-[1200px] mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-500">Home</Link>
            <span>/</span>
            <Link href="/all-product" className="hover:text-blue-500">Products</Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">{product.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image Section */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="loading loading-spinner loading-lg text-blue-500"></div>
                </div>
              )}
              <img 
                src={product.thumbnailImage} 
                alt={product.title}
                className="w-full h-96 lg:h-[500px] object-cover"
                onLoad={() => setImageLoading(false)}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/500x500?text=No+Image";
                  setImageLoading(false);
                }}
              />
              
              {/* Image overlay buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button 
                  onClick={handleShare}
                  className="w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 backdrop-blur-sm"
                  title="Share product"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </button>
                <button 
                  onClick={handleAddToWishlist}
                  className="w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 backdrop-blur-sm"
                  title="Add to wishlist"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="space-y-6">
            {/* Title and Price */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
                  {product.title}
                </h1>
                <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-4 ${
                  product.eventType === 'High' ? 'bg-red-100 text-red-800' :
                  product.eventType === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {product.eventType} Priority
                </span>
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-green-600">{product.price}</span>
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Added {new Date(product.date).toLocaleDateString()}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button 
                  onClick={handleContactSeller}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Contact Seller
                </button>
                <button 
                  onClick={handleAddToWishlist}
                  className="px-4 py-4 bg-white text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl border border-gray-200 flex items-center justify-center"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Description</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Overview</h4>
                  <p className="text-gray-600 leading-relaxed">{product.shortDescription}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Details</h4>
                  <div className="text-gray-600 leading-relaxed">
                    {showFullDescription ? (
                      <div>
                        <p>{product.fullDescription}</p>
                        <button 
                          onClick={() => setShowFullDescription(false)}
                          className="text-blue-500 hover:text-blue-600 font-medium mt-2 px-3 py-1 rounded-lg hover:bg-blue-50 transition-all duration-200"
                        >
                          Show less
                        </button>
                      </div>
                    ) : (
                      <div>
                        <p>{product.fullDescription?.substring(0, 200)}...</p>
                        <button 
                          onClick={() => setShowFullDescription(true)}
                          className="text-blue-500 hover:text-blue-600 font-medium mt-2 px-3 py-1 rounded-lg hover:bg-blue-50 transition-all duration-200"
                        >
                          Read more
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Product Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <div>
                    <p className="text-sm text-gray-500">Priority Level</p>
                    <p className="font-medium">{product.eventType}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <div>
                    <p className="text-sm text-gray-500">Date Listed</p>
                    <p className="font-medium">{new Date(product.date).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex gap-4">
              <Link 
                href="/all-product"
                className="flex-1 px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl border border-gray-200 flex items-center justify-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                All Products
              </Link>
              <button 
                onClick={() => router.back()}
                className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link 
                  key={relatedProduct.id || relatedProduct._id}
                  href={`/detail-product/${relatedProduct.id || relatedProduct._id}`}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <img
                    src={relatedProduct.thumbnailImage}
                    alt={relatedProduct.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                    }}
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{relatedProduct.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{relatedProduct.shortDescription}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-green-600">{relatedProduct.price}</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        relatedProduct.eventType === 'High' ? 'bg-red-100 text-red-800' :
                        relatedProduct.eventType === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {relatedProduct.eventType}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <ToastContainer position="top-right" />
    </div>
  );
}
