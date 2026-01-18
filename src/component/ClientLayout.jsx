"use client";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="loading loading-spinner loading-lg text-blue-500"></div>
    </div>
  );
}

export default function ClientLayout({ children }) {
  return (
    <SessionProvider>
      <Suspense fallback={<LoadingFallback />}>
        <Navbar />
        <div className="grow">{children}</div>
        <Footer />
      </Suspense>
    </SessionProvider>
  );
}
