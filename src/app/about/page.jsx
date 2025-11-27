"use client";

import React from "react";

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      {/* Page Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-center text-blue-600 mb-6">
        About Us
      </h1>

      {/* Short Description */}
      <p className="text-center text-lg md:text-xl text-gray-700 mb-12">
        Welcome to ProductVault! We provide high-quality products with a focus
        on customer satisfaction. Learn more about our mission and values below.
      </p>

      {/* About Sections */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* Section 1 */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-4 text-blue-500">Our Mission</h2>
          <p className="text-gray-600">
            Our mission is to deliver quality products that bring value to our
            customers. We are committed to excellence and continuous improvement
            in everything we do.
          </p>
        </div>

        {/* Section 2 */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-4 text-blue-500">Our Vision</h2>
          <p className="text-gray-600">
            We aim to become the leading platform for premium products by
            leveraging technology, customer insights, and sustainability.
          </p>
        </div>

        {/* Section 3 */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-4 text-blue-500">Our Values</h2>
          <p className="text-gray-600">
            Integrity, quality, innovation, and customer satisfaction are the
            core values that guide our operations and decisions every day.
          </p>
        </div>

        {/* Section 4 */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-4 text-blue-500">Our Team</h2>
          <p className="text-gray-600">
            Our team consists of passionate and skilled professionals dedicated
            to providing the best experience for our customers.
          </p>
        </div>
      </div>
    </div>
  );
}
