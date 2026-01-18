"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample blog posts - in production, this would come from a CMS or API
  const blogPosts = [
    {
      id: 1,
      title: "10 Essential Features Every Product Management App Should Have",
      excerpt: "Discover the key features that make product management applications truly effective for businesses and individuals alike.",
      content: "Product management has evolved significantly in recent years...",
      author: "Sarah Johnson",
      date: "2024-01-15",
      category: "Product Management",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
      readTime: "5 min read",
      tags: ["productivity", "management", "features"]
    },
    {
      id: 2,
      title: "The Future of E-commerce: Trends to Watch in 2024",
      excerpt: "Explore the latest trends shaping the e-commerce landscape and how they impact product management strategies.",
      content: "E-commerce continues to evolve at a rapid pace...",
      author: "Mike Chen",
      date: "2024-01-12",
      category: "E-commerce",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
      readTime: "7 min read",
      tags: ["ecommerce", "trends", "technology"]
    },
    {
      id: 3,
      title: "How to Optimize Your Product Listings for Better Visibility",
      excerpt: "Learn proven strategies to make your products stand out and attract more customers in competitive marketplaces.",
      content: "Product visibility is crucial for success...",
      author: "Emily Rodriguez",
      date: "2024-01-10",
      category: "Marketing",
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=500&h=300&fit=crop",
      readTime: "6 min read",
      tags: ["seo", "optimization", "marketing"]
    },
    {
      id: 4,
      title: "Building Trust: The Importance of Product Reviews and Ratings",
      excerpt: "Understand how customer reviews and ratings impact purchasing decisions and business growth.",
      content: "Customer trust is the foundation of successful businesses...",
      author: "David Park",
      date: "2024-01-08",
      category: "Customer Experience",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=500&h=300&fit=crop",
      readTime: "4 min read",
      tags: ["reviews", "trust", "customer-experience"]
    },
    {
      id: 5,
      title: "Mobile-First Product Management: Best Practices for 2024",
      excerpt: "Discover how to optimize your product management workflow for mobile devices and remote teams.",
      content: "Mobile optimization is no longer optional...",
      author: "Lisa Wang",
      date: "2024-01-05",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=300&fit=crop",
      readTime: "8 min read",
      tags: ["mobile", "responsive", "workflow"]
    },
    {
      id: 6,
      title: "Analytics That Matter: Key Metrics for Product Success",
      excerpt: "Learn which analytics and metrics you should track to measure and improve your product performance.",
      content: "Data-driven decisions are essential for product success...",
      author: "Alex Thompson",
      date: "2024-01-03",
      category: "Analytics",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
      readTime: "6 min read",
      tags: ["analytics", "metrics", "data"]
    }
  ];

  const categories = ['all', ...new Set(blogPosts.map(post => post.category))];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts[0];
  const recentPosts = blogPosts.slice(1, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1200px] mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Product Vault Blog</h1>
          <p className="text-lg text-gray-600">Insights, tips, and trends in product management</p>
        </div>

        {/* Featured Post */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </span>
                  <span className="text-gray-500 text-sm">{featuredPost.readTime}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{featuredPost.title}</h2>
                <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {featuredPost.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{featuredPost.author}</p>
                      <p className="text-sm text-gray-500">{new Date(featuredPost.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <Link 
                    href={`/blog/${featuredPost.id}`}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>

          {/* Category Tags */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md hover:shadow-lg'
                }`}
              >
                {category === 'all' ? 'All' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-xs">{post.readTime}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {post.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{post.author}</p>
                      <p className="text-xs text-gray-500">{new Date(post.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <Link 
                    href={`/blog/${post.id}`}
                    className="text-blue-500 hover:text-blue-600 font-medium text-sm"
                  >
                    Read More →
                  </Link>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mt-4">
                  {post.tags.map(tag => (
                    <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
            <p className="text-gray-500 mb-8">Try adjusting your search or filter criteria</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-6">Get the latest product management insights delivered to your inbox</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}