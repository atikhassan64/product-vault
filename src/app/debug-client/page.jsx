"use client";

export default function DebugClientPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          ✅ Client Component Working!
        </h1>
        <div className="space-y-2 text-gray-700">
          <p><strong>Rendering:</strong> Client-Side</p>
          <p><strong>Time:</strong> {new Date().toISOString()}</p>
          <p><strong>JavaScript:</strong> Enabled</p>
        </div>
        <div className="mt-4 p-4 bg-green-50 rounded">
          <p className="text-sm text-green-800">
            This page uses client-side rendering. If you can see this, 
            JavaScript is working correctly in production.
          </p>
        </div>
      </div>
    </div>
  );
}