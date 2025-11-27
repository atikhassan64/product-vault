"use client";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <div className="max-w-6xl mx-auto px-4 py-24 flex flex-col-reverse md:flex-row items-center gap-8">
        {/* Left side: Text */}
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Manage Your Products Effortlessly
          </h1>
          <p className="text-lg md:text-xl text-white/90">
            ProductVault helps you add, manage, and showcase your products with a clean, responsive UI.
          </p>
          <div className="flex gap-4">
            <Link
              href="/all-product"
              className="px-6 py-3 bg-white text-blue-600 font-semibold rounded shadow hover:bg-gray-100 transition"
            >
              Browse Products
            </Link>
           
          </div>
        </div>

        {/* Right side: Image / Illustration */}
        <div className="md:w-1/2">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden h-80 md:h-96 flex items-center justify-center">
            <img
              src="https://lh6.googleusercontent.com/proxy/-7clsZKKzq2q8Zsgdb7WB0XW6jiTJtjVBqz0Z4zqzxemD5EPiTdkjStT7oPP7f1dhUtSSKu01cdILnvz_5ZDKkkcXTCgQBSqzeS_gCYgBhGUgu7U3QO9pvJT_KAm6lLcWcI3KH82i4NEzxG_e7Ae2hyIB_yhvhJSY_JaHFT8p6LQfA"
              alt="Hero Illustration"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

