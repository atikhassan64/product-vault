"use client";

import { signOut, useSession } from "next-auth/react";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

export default function Navbar() {
    const { data: session, status } = useSession();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await signOut({ callbackUrl: "/" });
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    // Don't render until mounted to prevent hydration issues
    if (!mounted) {
        return (
            <div className='bg-white shadow-lg border-b'>
                <div className="navbar max-w-7xl mx-auto px-4">
                    <div className="navbar-start">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">PV</span>
                            </div>
                            <span className="text-xl font-bold text-gray-800">Product Vault</span>
                        </Link>
                    </div>
                    <div className="navbar-end">
                        <div className="loading loading-spinner loading-sm"></div>
                    </div>
                </div>
            </div>
        );
    }

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/all-product', label: 'Products' },
        { href: '/categories', label: 'Categories' },
        { href: '/reviews', label: 'Reviews' },
        { href: '/blog', label: 'Blog' },
        { href: '/support', label: 'Support' },
        { href: '/about', label: 'About' }
    ];

    const userMenuLinks = [
        { href: '/addProduct', label: 'Add Product', icon: '➕' },
        { href: '/manage-product', label: 'Manage Products', icon: '📦' },
        { href: '/wishlist', label: 'My Wishlist', icon: '❤️' },
        { href: '/analytics', label: 'Analytics', icon: '📊' }
    ];

    return (
        <div className='bg-white shadow-lg border-b sticky top-0 z-50'>
            <div className="navbar max-w-7xl mx-auto px-4">
                {/* Logo and Brand */}
                <div className="navbar-start">
                    <div className="dropdown lg:hidden">
                        <div tabIndex={0} role="button" className="btn btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> 
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52 border">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-gray-700 hover:text-blue-600 hover:bg-blue-50">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Link href="/" className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-lg">PV</span>
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Product Vault
                        </span>
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 space-x-2">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link 
                                    href={link.href} 
                                    className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg px-4 py-2 transition-all duration-200 font-medium"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* User Section */}
                <div className="navbar-end">
                    {status === "loading" ? (
                        <div className="loading loading-spinner loading-sm text-blue-500"></div>
                    ) : session ? (
                        <div className="flex items-center space-x-3">
                            {/* User Dropdown */}
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar hover:shadow-lg transition-all duration-200">
                                    <div className="w-10 rounded-full ring-2 ring-blue-200 hover:ring-blue-400">
                                        <img
                                            alt="User Avatar"
                                            src={session.user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(session.user?.name || 'User')}&background=3b82f6&color=fff`}
                                            className="rounded-full"
                                        />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow-xl menu menu-sm dropdown-content bg-white rounded-xl w-64 border">
                                    {/* User Info */}
                                    <li className="px-4 py-3 border-b border-gray-100">
                                        <div className="flex flex-col">
                                            <p className="font-semibold text-gray-800">{session.user?.name || 'User'}</p>
                                            <p className="text-sm text-gray-500">{session.user?.email}</p>
                                        </div>
                                    </li>
                                    
                                    {/* User Menu Links */}
                                    {userMenuLinks.map((link) => (
                                        <li key={link.href}>
                                            <Link 
                                                href={link.href} 
                                                className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg py-2"
                                            >
                                                <span className="text-lg">{link.icon}</span>
                                                <span>{link.label}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Logout Button */}
                            <button 
                                className="btn btn-outline btn-sm hover:bg-red-500 hover:border-red-500 hover:text-white transition-all duration-200" 
                                onClick={handleLogout}
                                disabled={isLoggingOut}
                            >
                                {isLoggingOut ? (
                                    <>
                                        <span className="loading loading-spinner loading-xs"></span>
                                        Logging out...
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Logout
                                    </>
                                )}
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-3">
                            <Link 
                                href="/login" 
                                className="btn btn-ghost btn-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                            >
                                Login
                            </Link>
                            <Link 
                                className="btn btn-primary btn-sm bg-gradient-to-r from-blue-500 to-purple-600 border-none hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200" 
                                href="/register"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
