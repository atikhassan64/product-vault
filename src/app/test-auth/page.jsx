"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TestAuthPage() {
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('demo123');
  const [loading, setLoading] = useState(false);

  const testLogin = async () => {
    setLoading(true);
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error('Login failed: ' + result.error);
        console.error('Login error:', result);
      } else {
        toast.success('Login successful!');
        console.log('Login success:', result);
      }
    } catch (error) {
      toast.error('Login error: ' + error.message);
      console.error('Login exception:', error);
    } finally {
      setLoading(false);
    }
  };

  const testRegister = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
          password: 'test123'
        })
      });

      const data = await res.json();
      
      if (res.ok) {
        toast.success('Registration successful!');
        console.log('Registration success:', data);
      } else {
        toast.error('Registration failed: ' + data.message);
        console.error('Registration error:', data);
      }
    } catch (error) {
      toast.error('Registration error: ' + error.message);
      console.error('Registration exception:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[600px] mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Authentication Test</h1>
      
      <div className="space-y-6">
        {/* Demo Login Test */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Test Demo Login</h2>
          <p className="text-gray-600 mb-4">
            Use the pre-created demo account to test login functionality.
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <button
              onClick={testLogin}
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? 'Testing Login...' : 'Test Login'}
            </button>
          </div>
        </div>

        {/* Registration Test */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Test Registration</h2>
          <p className="text-gray-600 mb-4">
            Test creating a new user account.
          </p>
          
          <button
            onClick={testRegister}
            disabled={loading}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? 'Testing Registration...' : 'Test Register New User'}
          </button>
        </div>

        {/* API Test */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">API Endpoints</h2>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Registration:</span>
              <code className="text-xs bg-gray-100 px-2 py-1 rounded">POST /api/auth/register</code>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Login:</span>
              <code className="text-xs bg-gray-100 px-2 py-1 rounded">POST /api/auth/callback/credentials</code>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Session:</span>
              <code className="text-xs bg-gray-100 px-2 py-1 rounded">GET /api/auth/session</code>
            </div>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">Demo Credentials</h3>
          <div className="text-sm text-blue-700">
            <p><strong>Email:</strong> demo@example.com</p>
            <p><strong>Password:</strong> demo123</p>
          </div>
        </div>
      </div>
      
      <ToastContainer position="top-right" />
    </div>
  );
}