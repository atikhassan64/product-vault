"use client";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { SessionProvider } from "next-auth/react";

export default function ClientLayout({ children }) {
  return (
    <SessionProvider>
      <Navbar />
      <div className="grow">{children}</div>
      <Footer />
    </SessionProvider>
  );
}
