"use client";

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

export default function SupportPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('faq');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'medium'
  });
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      id: 1,
      category: 'Account',
      question: 'How do I create an account?',
      answer: 'You can create an account by clicking the "Register" button in the top navigation. Fill in your name, email, and password, then click "Register". You can also sign up using your Google account for faster registration.'
    },
    {
      id: 2,
      category: 'Products',
      question: 'How do I add a new product?',
      answer: 'After logging in, go to "Add Product" from your user menu. Fill in all the required information including title, description, price, priority level, and image URL. Click "Add Product" to save it to your account.'
    },
    {
      id: 3,
      category: 'Products',
      question: 'Can I edit or delete my products?',
      answer: 'Yes! Go to "Manage Products" from your user menu to see all your products. You can delete products using the delete button. Product editing will be available in a future update.'
    },
    {
      id: 4,
      category: 'Account',
      question: 'How do I reset my password?',
      answer: 'Password reset functionality is coming soon. For now, please contact support if you need help accessing your account.'
    },
    {
      id: 5,
      category: 'Features',
      question: 'What is the wishlist feature?',
      answer: 'The wishlist allows you to save products you\'re interested in. Click the heart icon on any product detail page to add it to your wishlist. Access your wishlist from the user menu.'
    },
    {
      id: 6,
      category: 'Features',
      question: 'How do product priorities work?',
      answer: 'Product priorities (High, Medium, Low) help you organize and categorize your products. High priority items are highlighted in red, medium in yellow, and low in green throughout the application.'
    },
    {
      id: 7,
      category: 'Technical',
      question: 'Why can\'t I see my product images?',
      answer: 'Make sure you\'re using a valid image URL that ends with .jpg, .png, or .gif. The image should be publicly accessible on the internet. If problems persist, try using a different image hosting service.'
    },
    {
      id: 8,
      category: 'Technical',
      question: 'The website is loading slowly. What can I do?',
      answer: 'Try refreshing the page or clearing your browser cache. If the problem persists, check your internet connection or try accessing the site from a different browser.'
    }
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    
    if (!session) {
      toast.error('Please login to submit a support request');
      return;
    }

    // Simulate sending support request
    toast.success('Support request submitted successfully! We\'ll get back to you within 24 hours.');
    
    // Reset form
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: '',
      priority: 'medium'
    });
  };

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [...new Set(faqs.map(faq => faq.category))];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1200px] mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Support Center</h1>
          <p className="text-lg text-gray-600">Get help and find answers to your questions</p>
        </div>

        {/* Quick Help Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Getting Started</h3>
            <p className="text-gray-600 mb-4">Learn the basics of using Product Vault</p>
            <button 
              onClick={() => setActiveTab('faq')}
              className="btn bg-blue-500 text-white hover:bg-blue-600"
            >
              View FAQ
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Contact Support</h3>
            <p className="text-gray-600 mb-4">Get personalized help from our team</p>
            <button 
              onClick={() => setActiveTab('contact')}
              className="btn bg-green-500 text-white hover:bg-green-600"
            >
              Contact Us
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-4xl mb-4">🔧</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Technical Help</h3>
            <p className="text-gray-600 mb-4">Troubleshoot common issues</p>
            <button 
              onClick={() => setActiveTab('technical')}
              className="btn bg-purple-500 text-white hover:bg-purple-600"
            >
              Get Help
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('faq')}
                className={`px-6 py-4 font-medium ${
                  activeTab === 'faq'
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                FAQ
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`px-6 py-4 font-medium ${
                  activeTab === 'contact'
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Contact Support
              </button>
              <button
                onClick={() => setActiveTab('technical')}
                className={`px-6 py-4 font-medium ${
                  activeTab === 'technical'
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Technical Help
              </button>
            </nav>
          </div>

          <div className="p-8">
            {/* FAQ Tab */}
            {activeTab === 'faq' && (
              <div>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
                  
                  {/* Search */}
                  <div className="mb-6">
                    <input
                      type="text"
                      placeholder="Search FAQs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Category Filter */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <button
                      onClick={() => setSearchQuery('')}
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        searchQuery === '' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      All
                    </button>
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSearchQuery(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium ${
                          searchQuery === category ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                  {filteredFaqs.map((faq) => (
                    <details key={faq.id} className="bg-gray-50 rounded-lg">
                      <summary className="p-4 cursor-pointer font-medium text-gray-800 hover:bg-gray-100 rounded-lg">
                        <span className="inline-block w-20 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded mr-3">
                          {faq.category}
                        </span>
                        {faq.question}
                      </summary>
                      <div className="p-4 pt-0 text-gray-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>

                {filteredFaqs.length === 0 && (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">🔍</div>
                    <p className="text-gray-500">No FAQs found matching your search.</p>
                  </div>
                )}
              </div>
            )}

            {/* Contact Tab */}
            {activeTab === 'contact' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Support</h2>
                
                {session ? (
                  <form onSubmit={handleContactSubmit} className="max-w-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                        <input
                          type="text"
                          value={contactForm.name}
                          onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                      <input
                        type="text"
                        value={contactForm.subject}
                        onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                      <select
                        value={contactForm.priority}
                        onChange={(e) => setContactForm(prev => ({ ...prev, priority: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="low">Low - General inquiry</option>
                        <option value="medium">Medium - Account issue</option>
                        <option value="high">High - Technical problem</option>
                        <option value="urgent">Urgent - Critical issue</option>
                      </select>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                      <textarea
                        value={contactForm.message}
                        onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Please describe your issue in detail..."
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Submit Support Request
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-4xl mb-4">🔒</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Login Required</h3>
                    <p className="text-gray-600 mb-6">Please login to submit a support request</p>
                    <Link href="/login" className="btn bg-blue-500 text-white hover:bg-blue-600">
                      Login
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Technical Help Tab */}
            {activeTab === 'technical' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Technical Help</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Common Issues</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-2">🖼️ Images not loading</h4>
                        <p className="text-sm text-gray-600">Check that your image URL is valid and publicly accessible.</p>
                      </div>
                      
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-2">🔐 Login problems</h4>
                        <p className="text-sm text-gray-600">Clear your browser cache and try again.</p>
                      </div>
                      
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-2">📱 Mobile issues</h4>
                        <p className="text-sm text-gray-600">Try refreshing the page or using a different browser.</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">System Status</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="text-gray-700">Authentication System</span>
                        <span className="text-green-600 font-medium">✅ Operational</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="text-gray-700">Product Management</span>
                        <span className="text-green-600 font-medium">✅ Operational</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="text-gray-700">File Uploads</span>
                        <span className="text-green-600 font-medium">✅ Operational</span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2">Need More Help?</h4>
                      <p className="text-sm text-blue-700 mb-3">
                        If you're still experiencing issues, please contact our support team.
                      </p>
                      <button 
                        onClick={() => setActiveTab('contact')}
                        className="btn bg-blue-500 text-white hover:bg-blue-600 btn-sm"
                      >
                        Contact Support
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <ToastContainer position="top-right" />
    </div>
  );
}