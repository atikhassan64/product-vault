"use client";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { SessionProvider } from "next-auth/react";
import { Suspense, useState, useEffect } from "react";

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="loading loading-spinner loading-lg text-blue-500"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

function ClientContent({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <LoadingFallback />;
  }

  return (
    <>
      <Navbar />
      <div className="grow">{children}</div>
      <Footer />
    </>
  );
}

export default function ClientLayout({ children }) {
  return (
    <SessionProvider>
      <Suspense fallback={<LoadingFallback />}>
        <ClientContent>{children}</ClientContent>
      </Suspense>
    </SessionProvider>
  );
}
