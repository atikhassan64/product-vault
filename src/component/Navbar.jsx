"use client";

import { signOut, useSession } from "next-auth/react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';

export default function Navbar() {
    const { data: session, status } = useSession();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

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

    // Function to check if a link is active
    const isActiveLink = (href) => {
        if (href === '/') {
            return pathname === '/';
        }
        return pathname.startsWith(href);
    };

    return (
        <div className='bg-white shadow-lg border-b sticky top-0 z-50'>
            <div className="flex items-center justify-between max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-2 sm:py-3">
                {/* Logo and Mobile Menu */}
                <div className="flex items-center space-x-2 sm:space-x-4">
                    {/* Mobile Menu Button */}
                    <div className="dropdown lg:hidden">
                        <div tabIndex={0} role="button" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> 
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52 border">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link 
                                        href={link.href} 
                                        className={`rounded-lg px-3 py-2 transition-all duration-200 ${
                                            isActiveLink(link.href)
                                                ? 'bg-blue-100 text-blue-700 font-semibold'
                                                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-sm sm:text-lg">PV</span>
                        </div>
                        <span className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden xs:block">
                            Product Vault
                        </span>
                        <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block xs:hidden">
                            PV
                        </span>
                    </Link>
                </div>

                {/* Navigation Links - Desktop */}
                <div className="hidden lg:flex flex-1 justify-center max-w-2xl mx-4">
                    <nav className="flex items-center space-x-1 xl:space-x-2">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.href}
                                href={link.href} 
                                className={`rounded-lg px-3 xl:px-4 py-2 transition-all duration-200 font-medium text-sm xl:text-base relative ${
                                    isActiveLink(link.href)
                                        ? 'text-blue-600 bg-blue-50 font-semibold'
                                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                                }`}
                            >
                                {link.label}
                                {isActiveLink(link.href) && (
                                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                                )}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* User Section */}
                <div className="flex items-center space-x-2 sm:space-x-3">
                    {status === "loading" ? (
                        <div className="loading loading-spinner loading-sm text-blue-500"></div>
                    ) : session ? (
                        <div className="flex items-center space-x-2 sm:space-x-3">
                            {/* User Dropdown */}
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="flex items-center justify-center p-1 rounded-full hover:bg-gray-100 transition-all duration-200">
                                    <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full ring-2 ring-blue-200 hover:ring-blue-400 transition-all duration-200 overflow-hidden">
                                        <img
                                            alt="User Avatar"
                                            src={session.user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(session.user?.name || 'User')}&background=3b82f6&color=fff`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow-xl menu menu-sm dropdown-content bg-white rounded-xl w-56 sm:w-64 border">
                                    {/* User Info */}
                                    <li className="px-4 py-3 border-b border-gray-100">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue-200">
                                                <img
                                                    alt="User Avatar"
                                                    src={session.user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(session.user?.name || 'User')}&background=3b82f6&color=fff`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-gray-800 truncate">{session.user?.name || 'User'}</p>
                                                <p className="text-sm text-gray-500 truncate">{session.user?.email}</p>
                                            </div>
                                        </div>
                                    </li>
                                    
                                    {/* User Menu Links */}
                                    {userMenuLinks.map((link) => (
                                        <li key={link.href}>
                                            <Link 
                                                href={link.href} 
                                                className={`flex items-center space-x-3 rounded-lg py-2 px-3 transition-all duration-200 ${
                                                    isActiveLink(link.href)
                                                        ? 'bg-blue-100 text-blue-700 font-semibold'
                                                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                                                }`}
                                            >
                                                <span className="text-lg">{link.icon}</span>
                                                <span className="text-sm">{link.label}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Logout Button - Hidden on small screens, shown in dropdown */}
                            <button 
                                className="hidden sm:flex items-center space-x-2 px-3 lg:px-4 py-2 border border-red-300 text-red-600 font-medium rounded-lg hover:bg-red-500 hover:text-white transition-all duration-200 text-sm" 
                                onClick={handleLogout}
                                disabled={isLoggingOut}
                            >
                                {isLoggingOut ? (
                                    <>
                                        <span className="loading loading-spinner loading-xs"></span>
                                        <span className="hidden lg:inline">Logging out...</span>
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        <span className="hidden lg:inline">Logout</span>
                                    </>
                                )}
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-2 sm:space-x-3">
                            <Link 
                                href="/login" 
                                className="px-3 sm:px-4 py-2 text-gray-700 hover:text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-all duration-200 text-sm"
                            >
                                <span className="hidden sm:inline">Login</span>
                                <span className="sm:hidden">In</span>
                            </Link>
                            <Link 
                                href="/register"
                                className="px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 text-sm"
                            >
                                <span className="hidden sm:inline">Register</span>
                                <span className="sm:hidden">Up</span>
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile User Menu for Logout (when logged in) */}
            {session && (
                <div className="sm:hidden border-t border-gray-100 px-4 py-2">
                    <button 
                        className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-red-300 text-red-600 font-medium rounded-lg hover:bg-red-500 hover:text-white transition-all duration-200 text-sm" 
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                    >
                        {isLoggingOut ? (
                            <>
                                <span className="loading loading-spinner loading-xs"></span>
                                <span>Logging out...</span>
                            </>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span>Logout</span>
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
}
