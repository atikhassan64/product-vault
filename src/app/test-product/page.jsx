"use client";

import Link from 'next/link';

export default function TestProductPage() {
  const sampleProducts = [
    { id: "1", title: "Premium Wireless Headphones" },
    { id: "2", title: "Smart Fitness Watch" },
    { id: "3", title: "Portable Bluetooth Speaker" }
  ];

  return (
    <div className="max-w-[800px] mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Test Product Detail Links</h1>
      
      <div className="space-y-4">
        {sampleProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">{product.title}</h2>
            <div className="flex gap-4">
              <Link 
                href={`/detail-product/${product.id}`}
                className="btn bg-blue-500 text-white hover:bg-blue-600"
              >
                View Product Details
              </Link>
              <a 
                href={`/api/products/${product.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Test API Endpoint
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">Quick Links:</h3>
        <div className="flex gap-4">
          <Link href="/all-product" className="text-blue-500 hover:underline">
            All Products
          </Link>
          <Link href="/" className="text-blue-500 hover:underline">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}