"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CategoriesPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Define categories based on product priorities and types
  const categories = [
    { id: 'all', name: 'All Categories', icon: '📦', count: 0 },
    { id: 'electronics', name: 'Electronics', icon: '💻', count: 0 },
    { id: 'accessories', name: 'Accessories', icon: '🎧', count: 0 },
    { id: 'wearables', name: 'Wearables', icon: '⌚', count: 0 },
    { id: 'audio', name: 'Audio', icon: '🔊', count: 0 },
    { id: 'high-priority', name: 'High Priority', icon: '🔥', count: 0 },
    { id: 'medium-priority', name: 'Medium Priority', icon: '⭐', count: 0 },
    { id: 'low-priority', name: 'Low Priority', icon: '📋', count: 0 }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
        updateCategoryCounts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateCategoryCounts = (products) => {
    categories[0].count = products.length; // All
    categories[4].count = products.filter(p => p.eventType === 'High').length; // High Priority
    categories[5].count = products.filter(p => p.eventType === 'Medium').length; // Medium Priority
    categories[6].count = products.filter(p => p.eventType === 'Low').length; // Low Priority
    
    // Categorize by product type (based on title keywords)
    categories[1].count = products.filter(p => 
      p.title.toLowerCase().includes('laptop') || 
      p.title.toLowerCase().includes('phone') ||
      p.title.toLowerCase().includes('computer')
    ).length;
    
    categories[2].count = products.filter(p => 
      p.title.toLowerCase().includes('headphone') || 
      p.title.toLowerCase().includes('case') ||
      p.title.toLowerCase().includes('cable')
    ).length;
    
    categories[3].count = products.filter(p => 
      p.title.toLowerCase().includes('watch') || 
      p.title.toLowerCase().includes('fitness') ||
      p.title.toLowerCase().includes('tracker')
    ).length;
    
    categories[4].count = products.filter(p => 
      p.title.toLowerCase().includes('speaker') || 
      p.title.toLowerCase().includes('audio') ||
      p.title.toLowerCase().includes('sound')
    ).length;
  };

  const getFilteredProducts = () => {
    if (selectedCategory === 'all') return products;
    
    switch (selectedCategory) {
      case 'electronics':
        return products.filter(p => 
          p.title.toLowerCase().includes('laptop') || 
          p.title.toLowerCase().includes('phone') ||
          p.title.toLowerCase().includes('computer')
        );
      case 'accessories':
        return products.filter(p => 
          p.title.toLowerCase().includes('headphone') || 
          p.title.toLowerCase().includes('case') ||
          p.title.toLowerCase().includes('cable')
        );
      case 'wearables':
        return products.filter(p => 
          p.title.toLowerCase().includes('watch') || 
          p.title.toLowerCase().includes('fitness') ||
          p.title.toLowerCase().includes('tracker')
        );
      case 'audio':
        return products.filter(p => 
          p.title.toLowerCase().includes('speaker') || 
          p.title.toLowerCase().includes('audio') ||
          p.title.toLowerCase().includes('sound')
        );
      case 'high-priority':
        return products.filter(p => p.eventType === 'High');
      case 'medium-priority':
        return products.filter(p => p.eventType === 'Medium');
      case 'low-priority':
        return products.filter(p => p.eventType === 'Low');
      default:
        return products;
    }
  };

  const filteredProducts = getFilteredProducts();

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
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Product Categories</h1>
          <p className="text-lg text-gray-600">Browse products by category and priority</p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-6 rounded-2xl shadow-lg transition-all hover:shadow-xl ${
                selectedCategory === category.id
                  ? 'bg-blue-500 text-white transform scale-105'
                  : 'bg-white text-gray-800 hover:bg-gray-50'
              }`}
            >
              <div className="text-4xl mb-3">{category.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
              <p className={`text-sm ${
                selectedCategory === category.id ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {category.count} products
              </p>
            </button>
          ))}
        </div>

        {/* Selected Category Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {categories.find(c => c.id === selectedCategory)?.name || 'All Categories'}
          </h2>
          <p className="text-gray-600">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id || product._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img
                  src={product.thumbnailImage}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                  }}
                />
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
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
            <p className="text-gray-500 mb-8">No products match the selected category</p>
            <button 
              onClick={() => setSelectedCategory('all')}
              className="btn bg-blue-500 text-white hover:bg-blue-600"
            >
              View All Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}