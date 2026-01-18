"use client";

import { useState, useEffect } from 'react';

export default function DebugClientPage() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState('');

  useEffect(() => {
    setMounted(true);
    setTime(new Date().toISOString());
    console.log('Client component mounted successfully');
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
          <h1 className="text-2xl font-bold text-yellow-600 mb-4">
            ⏳ Loading Client Component...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          ✅ Client Component Working!
        </h1>
        <div className="space-y-2 text-gray-700">
          <p><strong>Rendering:</strong> Client-Side</p>
          <p><strong>Mounted At:</strong> {time}</p>
          <p><strong>State:</strong> {mounted ? 'Hydrated' : 'Not Hydrated'}</p>
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