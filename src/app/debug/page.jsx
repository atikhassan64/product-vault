export default function DebugPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          🔍 Debug Page (Server-Side)
        </h1>
        <div className="space-y-2 text-gray-700">
          <p><strong>Rendering:</strong> Server-Side</p>
          <p><strong>Time:</strong> {new Date().toISOString()}</p>
          <p><strong>Environment:</strong> {process.env.NODE_ENV}</p>
        </div>
        <div className="mt-4 p-4 bg-blue-50 rounded">
          <p className="text-sm text-blue-800">
            This page uses server-side rendering only. If you can see this, 
            the server is working correctly.
          </p>
        </div>
      </div>
    </div>
  );
}