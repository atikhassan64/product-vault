"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function CompareContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const productIds = searchParams.get('products')?.split(',') || [];
    
    if (productIds.length === 0) {
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      try {
        const productPromises = productIds.map(id => 
          fetch(`/api/products/${id}`).then(res => res.json())
        );
        
        const fetchedProducts = await Promise.all(productPromises);
        setProducts(fetchedProducts.filter(p => p && !p.message)); // Filter out errors
      } catch (err) {
        setError('Failed to load products for comparison');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg text-blue-500"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📊</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Products to Compare</h2>
          <p className="text-gray-600 mb-8">Select products from the product listing to compare them</p>
          <Link 
            href="/all-product"
            className="btn bg-blue-500 text-white hover:bg-blue-600"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Product Comparison</h1>
          <Link 
            href="/all-product"
            className="btn btn-outline"
          >
            Back to Products
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left font-semibold text-gray-800 p-6">Features</th>
                  {products.map((product) => (
                    <th key={product.id || product._id} className="text-center p-6 min-w-[250px]">
                      <div className="space-y-3">
                        <img
                          src={product.thumbnailImage}
                          alt={product.title}
                          className="w-20 h-20 object-cover rounded-lg mx-auto"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/80x80?text=No+Image";
                          }}
                        />
                        <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">
                          {product.title}
                        </h3>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Price Row */}
                <tr className="border-b">
                  <td className="font-semibold text-gray-800 p-6">Price</td>
                  {products.map((product) => (
                    <td key={product.id || product._id} className="text-center p-6">
                      <span className="text-2xl font-bold text-green-600">
                        {product.price}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Priority Row */}
                <tr className="border-b">
                  <td className="font-semibold text-gray-800 p-6">Priority</td>
                  {products.map((product) => (
                    <td key={product.id || product._id} className="text-center p-6">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        product.eventType === 'High' ? 'bg-red-100 text-red-800' :
                        product.eventType === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {product.eventType}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Short Description Row */}
                <tr className="border-b">
                  <td className="font-semibold text-gray-800 p-6">Overview</td>
                  {products.map((product) => (
                    <td key={product.id || product._id} className="p-6">
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {product.shortDescription}
                      </p>
                    </td>
                  ))}
                </tr>

                {/* Full Description Row */}
                <tr className="border-b">
                  <td className="font-semibold text-gray-800 p-6">Details</td>
                  {products.map((product) => (
                    <td key={product.id || product._id} className="p-6">
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {product.fullDescription}
                      </p>
                    </td>
                  ))}
                </tr>

                {/* Date Added Row */}
                <tr className="border-b">
                  <td className="font-semibold text-gray-800 p-6">Date Added</td>
                  {products.map((product) => (
                    <td key={product.id || product._id} className="text-center p-6">
                      <span className="text-gray-600">
                        {new Date(product.date).toLocaleDateString()}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Actions Row */}
                <tr>
                  <td className="font-semibold text-gray-800 p-6">Actions</td>
                  {products.map((product) => (
                    <td key={product.id || product._id} className="text-center p-6">
                      <div className="space-y-2">
                        <Link
                          href={`/detail-product/${product.id || product._id}`}
                          className="btn bg-blue-500 text-white hover:bg-blue-600 btn-sm w-full"
                        >
                          View Details
                        </Link>
                        <button className="btn btn-outline btn-sm w-full">
                          Contact Seller
                        </button>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Comparison Summary */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Comparison Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Lowest Price</h3>
              <p className="text-2xl font-bold text-green-600">
                ${Math.min(...products.map(p => parseFloat(p.price.replace('$', ''))))}
              </p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Products Compared</h3>
              <p className="text-2xl font-bold text-blue-600">{products.length}</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">High Priority</h3>
              <p className="text-2xl font-bold text-purple-600">
                {products.filter(p => p.eventType === 'High').length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg text-blue-500"></div>
      </div>
    }>
      <CompareContent />
    </Suspense>
  );
}