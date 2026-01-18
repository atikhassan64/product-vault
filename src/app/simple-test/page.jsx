"use client";

import { useState } from 'react';

export default function SimpleTestPage() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          ✅ Simple React Test
        </h1>
        <div className="space-y-4">
          <p className="text-gray-700">
            Counter: <span className="font-bold text-blue-600">{count}</span>
          </p>
          <div className="space-x-2">
            <button 
              onClick={() => setCount(count + 1)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Increment
            </button>
            <button 
              onClick={() => setCount(count - 1)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Decrement
            </button>
            <button 
              onClick={() => setCount(0)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}