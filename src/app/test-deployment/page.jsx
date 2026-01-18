"use client";

export default function TestDeployment() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          ✅ Deployment Test Successful!
        </h1>
        <div className="space-y-2 text-gray-700">
          <p><strong>Status:</strong> Application is running</p>
          <p><strong>Environment:</strong> {process.env.NODE_ENV || 'production'}</p>
          <p><strong>NextAuth URL:</strong> {process.env.NEXTAUTH_URL || 'Not set'}</p>
          <p><strong>Google OAuth:</strong> {process.env.GOOGLE_ID ? 'Configured' : 'Not configured'}</p>
        </div>
        <div className="mt-6 space-y-2">
          <a href="/login" className="block bg-blue-500 text-white px-4 py-2 rounded text-center hover:bg-blue-600">
            Test Login Page
          </a>
          <a href="/register" className="block bg-green-500 text-white px-4 py-2 rounded text-center hover:bg-green-600">
            Test Register Page
          </a>
          <a href="/all-product" className="block bg-purple-500 text-white px-4 py-2 rounded text-center hover:bg-purple-600">
            Test Products Page
          </a>
        </div>
      </div>
    </div>
  );
}