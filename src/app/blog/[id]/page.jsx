"use client";

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BlogPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sample blog posts data (same as in blog page)
  const blogPosts = [
    {
      id: 1,
      title: "10 Essential Features Every Product Management App Should Have",
      excerpt: "Discover the key features that make product management applications truly effective for businesses and individuals alike.",
      content: `
        <h2>Introduction</h2>
        <p>Product management has evolved significantly in recent years, with businesses and individuals seeking more sophisticated tools to organize, track, and optimize their product portfolios. Whether you're managing a small inventory or overseeing a large enterprise catalog, having the right features in your product management application can make the difference between success and frustration.</p>
        
        <h2>1. Intuitive User Interface</h2>
        <p>The foundation of any great product management app is an intuitive, user-friendly interface. Users should be able to navigate the application effortlessly, finding what they need without extensive training or documentation.</p>
        
        <h2>2. Comprehensive Product Cataloging</h2>
        <p>A robust cataloging system allows users to organize products with detailed information including descriptions, images, pricing, and categorization. This feature should support bulk uploads and easy editing capabilities.</p>
        
        <h2>3. Advanced Search and Filtering</h2>
        <p>Users need to quickly find specific products within large catalogs. Advanced search functionality with multiple filter options (price range, category, priority, date added) is essential for productivity.</p>
        
        <h2>4. Priority Management System</h2>
        <p>Not all products are created equal. A priority system (High, Medium, Low) helps users focus on what matters most and organize their workflow accordingly.</p>
        
        <h2>5. User Authentication and Security</h2>
        <p>Secure user authentication ensures that product data remains protected while allowing authorized users to access and manage their inventories safely.</p>
        
        <h2>Conclusion</h2>
        <p>These essential features form the backbone of effective product management applications. By implementing these capabilities, developers can create tools that truly serve their users' needs and drive business success.</p>
      `,
      author: "Sarah Johnson",
      date: "2024-01-15",
      category: "Product Management",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
      readTime: "5 min read",
      tags: ["productivity", "management", "features"]
    },
    {
      id: 2,
      title: "The Future of E-commerce: Trends to Watch in 2024",
      excerpt: "Explore the latest trends shaping the e-commerce landscape and how they impact product management strategies.",
      content: `
        <h2>The E-commerce Revolution Continues</h2>
        <p>E-commerce continues to evolve at a rapid pace, driven by technological advances, changing consumer behaviors, and global market dynamics. As we move through 2024, several key trends are reshaping how businesses approach online retail and product management.</p>
        
        <h2>AI-Powered Personalization</h2>
        <p>Artificial intelligence is revolutionizing how businesses understand and serve their customers. From personalized product recommendations to dynamic pricing strategies, AI is becoming an essential tool for competitive advantage.</p>
        
        <h2>Mobile-First Shopping Experience</h2>
        <p>With mobile commerce accounting for an increasing share of online sales, businesses must prioritize mobile-optimized experiences. This includes responsive design, fast loading times, and intuitive mobile interfaces.</p>
        
        <h2>Sustainability and Ethical Commerce</h2>
        <p>Consumers are increasingly conscious of environmental and social impacts. E-commerce businesses are responding with sustainable packaging, ethical sourcing, and transparent supply chain practices.</p>
        
        <h2>Social Commerce Integration</h2>
        <p>Social media platforms are becoming powerful sales channels. Integration with social commerce features allows businesses to reach customers where they spend their time online.</p>
      `,
      author: "Mike Chen",
      date: "2024-01-12",
      category: "E-commerce",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop",
      readTime: "7 min read",
      tags: ["ecommerce", "trends", "technology"]
    }
    // Add more posts as needed
  ];

  useEffect(() => {
    const foundPost = blogPosts.find(p => p.id === parseInt(id));
    setPost(foundPost);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg text-blue-500"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Article Not Found</h2>
          <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
          <Link href="/blog" className="btn bg-blue-500 text-white hover:bg-blue-600">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[800px] mx-auto py-8 px-4">
        {/* Breadcrumb */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-500">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-blue-500">Blog</Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">{post.title}</span>
          </div>
        </div>

        {/* Article Header */}
        <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 md:h-80 object-cover"
          />
          
          <div className="p-8">
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
              <span className="text-gray-500 text-sm">{post.readTime}</span>
              <span className="text-gray-500 text-sm">{new Date(post.date).toLocaleDateString()}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Author Info */}
            <div className="flex items-center gap-4 mb-8 pb-8 border-b">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                {post.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{post.author}</p>
                <p className="text-sm text-gray-500">Published on {new Date(post.date).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
              style={{
                lineHeight: '1.8',
                fontSize: '1.1rem'
              }}
            />

            {/* Tags */}
            <div className="mt-8 pt-8 border-t">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-8 pt-8 border-t flex justify-between items-center">
              <Link 
                href="/blog"
                className="btn btn-outline"
              >
                ← Back to Blog
              </Link>
              
              <div className="flex gap-4">
                <button className="btn btn-outline btn-sm">
                  Share Article
                </button>
                <button className="btn bg-blue-500 text-white hover:bg-blue-600 btn-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts
              .filter(p => p.id !== post.id && p.category === post.category)
              .slice(0, 2)
              .map(relatedPost => (
                <Link 
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.id}`}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-gray-500">{relatedPost.readTime}</span>
                      <span className="text-blue-500 text-sm font-medium">Read More →</span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}