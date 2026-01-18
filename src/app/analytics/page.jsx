"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import ProtectedRoute from '@/component/ProtectedRoute';

export default function AnalyticsPage() {
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);
  const [userProducts, setUserProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState({
    totalProducts: 0,
    userProducts: 0,
    highPriority: 0,
    mediumPriority: 0,
    lowPriority: 0,
    averagePrice: 0,
    recentProducts: []
  });

  useEffect(() => {
    if (session) {
      fetchAnalytics();
    }
  }, [session]);

  const fetchAnalytics = async () => {
    try {
      // Fetch all products
      const allRes = await fetch('/api/products');
      const allProducts = await allRes.json();
      
      // Fetch user products
      const userRes = await fetch(`/api/products?email=${session.user.email}`);
      const userProducts = await userRes.json();
      
      setProducts(allProducts);
      setUserProducts(userProducts);
      
      // Calculate analytics
      const totalProducts = allProducts.length;
      const userProductCount = userProducts.length;
      const highPriority = userProducts.filter(p => p.eventType === 'High').length;
      const mediumPriority = userProducts.filter(p => p.eventType === 'Medium').length;
      const lowPriority = userProducts.filter(p => p.eventType === 'Low').length;
      
      // Calculate average price (remove $ and convert to number)
      const prices = userProducts.map(p => parseFloat(p.price.replace('$', '')));
      const averagePrice = prices.length > 0 ? prices.reduce((a, b) => a + b, 0) / prices.length : 0;
      
      // Get recent products (last 5)
      const recentProducts = userProducts
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
      
      setAnalytics({
        totalProducts,
        userProducts: userProductCount,
        highPriority,
        mediumPriority,
        lowPriority,
        averagePrice,
        recentProducts
      });
      
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
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
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">Track your product performance and insights</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Products</p>
                  <p className="text-3xl font-bold text-blue-600">{analytics.totalProducts}</p>
                </div>
                <div className="text-4xl">📦</div>
              </div>
              <p className="text-xs text-gray-400 mt-2">All products in system</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Your Products</p>
                  <p className="text-3xl font-bold text-green-600">{analytics.userProducts}</p>
                </div>
                <div className="text-4xl">🏷️</div>
              </div>
              <p className="text-xs text-gray-400 mt-2">Products you've added</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">High Priority</p>
                  <p className="text-3xl font-bold text-red-600">{analytics.highPriority}</p>
                </div>
                <div className="text-4xl">🔥</div>
              </div>
              <p className="text-xs text-gray-400 mt-2">High priority items</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Avg. Price</p>
                  <p className="text-3xl font-bold text-purple-600">${analytics.averagePrice.toFixed(0)}</p>
                </div>
                <div className="text-4xl">💰</div>
              </div>
              <p className="text-xs text-gray-400 mt-2">Average product price</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Priority Distribution */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Priority Distribution</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-500 rounded mr-3"></div>
                    <span className="text-gray-700">High Priority</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 mr-2">{analytics.highPriority}</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full" 
                        style={{ width: `${analytics.userProducts > 0 ? (analytics.highPriority / analytics.userProducts) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-yellow-500 rounded mr-3"></div>
                    <span className="text-gray-700">Medium Priority</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 mr-2">{analytics.mediumPriority}</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-500 h-2 rounded-full" 
                        style={{ width: `${analytics.userProducts > 0 ? (analytics.mediumPriority / analytics.userProducts) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-500 rounded mr-3"></div>
                    <span className="text-gray-700">Low Priority</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 mr-2">{analytics.lowPriority}</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${analytics.userProducts > 0 ? (analytics.lowPriority / analytics.userProducts) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Performance Metrics</h3>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {analytics.userProducts > 0 ? ((analytics.userProducts / analytics.totalProducts) * 100).toFixed(1) : 0}%
                  </div>
                  <p className="text-gray-600">Market Share</p>
                  <p className="text-xs text-gray-400">Your products vs total</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{analytics.highPriority + analytics.mediumPriority}</div>
                    <p className="text-sm text-gray-600">Priority Items</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{analytics.lowPriority}</div>
                    <p className="text-sm text-gray-600">Standard Items</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Products */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Recent Products</h3>
            {analytics.recentProducts.length > 0 ? (
              <div className="space-y-4">
                {analytics.recentProducts.map((product) => (
                  <div key={product.id || product._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <img
                        src={product.thumbnailImage}
                        alt={product.title}
                        className="w-12 h-12 object-cover rounded-lg mr-4"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/48x48?text=No+Image";
                        }}
                      />
                      <div>
                        <h4 className="font-semibold text-gray-800">{product.title}</h4>
                        <p className="text-sm text-gray-500">{new Date(product.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-green-600">{product.price}</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        product.eventType === 'High' ? 'bg-red-100 text-red-800' :
                        product.eventType === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {product.eventType}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">📊</div>
                <p className="text-gray-500">No products added yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}