"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function DebugAuthPage() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // This is just for debugging - in production you wouldn't expose this
      const res = await fetch('/api/debug/users');
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="max-w-[800px] mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Authentication Debug</h1>
      
      <div className="space-y-6">
        {/* Session Info */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Current Session</h2>
          <div className="space-y-2">
            <p><strong>Status:</strong> {status}</p>
            {session ? (
              <div>
                <p><strong>User ID:</strong> {session.user?.id}</p>
                <p><strong>Name:</strong> {session.user?.name}</p>
                <p><strong>Email:</strong> {session.user?.email}</p>
              </div>
            ) : (
              <p className="text-gray-500">No active session</p>
            )}
          </div>
        </div>

        {/* Environment Variables */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Environment Check</h2>
          <div className="space-y-2 text-sm">
            <p><strong>NEXTAUTH_URL:</strong> {process.env.NEXTAUTH_URL || 'Not set'}</p>
            <p><strong>NEXTAUTH_SECRET:</strong> {process.env.NEXTAUTH_SECRET ? 'Set' : 'Not set'}</p>
            <p><strong>NODE_ENV:</strong> {process.env.NODE_ENV}</p>
          </div>
        </div>

        {/* Test Credentials */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">Test Credentials</h2>
          <div className="space-y-2 text-sm text-blue-700">
            <p><strong>Demo User:</strong></p>
            <p>Email: demo@example.com</p>
            <p>Password: demo123</p>
            <br />
            <p><strong>Test User (if registered):</strong></p>
            <p>Email: test@example.com</p>
            <p>Password: test123</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="flex gap-4">
            <a href="/login" className="btn bg-blue-500 text-white hover:bg-blue-600">
              Go to Login
            </a>
            <a href="/register" className="btn bg-green-500 text-white hover:bg-green-600">
              Go to Register
            </a>
            <a href="/test-auth" className="btn btn-outline">
              Test Auth Page
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}