"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from 'next/link'
import React, { useState } from 'react'
import userIcon from '../app/user-icon.png'

export default function Navbar() {
    const { data: session, status } = useSession();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

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

    const navLinks = <>
        <li><Link href='/'>Home</Link></li>
        <li><Link href='/all-product'>All Product</Link></li>
        <li><Link href='/categories'>Categories</Link></li>
        <li><Link href='/reviews'>Reviews</Link></li>
        <li><Link href='/blog'>Blog</Link></li>
        <li><Link href='/support'>Support</Link></li>
        <li><Link href='/about'>About</Link></li>
    </>

    const eventLinks = <>
        <li className='btn1'><Link href="/addProduct">Add Product</Link></li>
        <li className='btn1'><Link href="/manage-product">Manage Product</Link></li>
        <li className='btn1'><Link href="/wishlist">My Wishlist</Link></li>
        <li className='btn1'><Link href="/analytics">Analytics</Link></li>
    </>

    return (
        <div className='bg-base-100 shadow-sm'>
            <div className="navbar max-w-[1200px] mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> 
                            </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {navLinks}
                        </ul>
                    </div>
                    <Link href="/">
                        <img 
                            src="https://cdn.prod.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e3a57bdb30414bf9cea_Product_Dark.svg" 
                            alt="Product Vault Logo" 
                            className='h-10 w-28 bg-cover cursor-pointer' 
                        />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    <span style={{ marginLeft: "20px" }}>
                        {status === "loading" ? (
                            <div className="loading loading-spinner loading-sm"></div>
                        ) : session ? (
                            <>
                                <div className="dropdown dropdown-end mr-2">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img
                                                title={session.user.name || "User"}
                                                alt="User Avatar"
                                                src={session.user.image || userIcon.src}
                                            />
                                        </div>
                                    </div>
                                    <ul
                                        tabIndex="-1"
                                        className="menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
                                        <li className="px-4 py-2 text-sm text-gray-700 border-b">
                                            <div>
                                                <p className="font-semibold">{session.user.name}</p>
                                                <p className="text-xs text-gray-500">{session.user.email}</p>
                                            </div>
                                        </li>
                                        {eventLinks}
                                    </ul>
                                </div>
                                <button 
                                    className="btn btn-outline btn-sm" 
                                    onClick={handleLogout}
                                    disabled={isLoggingOut}
                                >
                                    {isLoggingOut ? (
                                        <>
                                            <span className="loading loading-spinner loading-xs"></span>
                                            Logging out...
                                        </>
                                    ) : (
                                        "Logout"
                                    )}
                                </button>
                            </>
                        ) : (
                            <div className="flex gap-3">
                                <Link href="/login" className="btn btn-outline btn-sm">Login</Link>
                                <Link className="btn btn-primary btn-sm" href="/register">Register</Link>
                            </div>
                        )}
                    </span>
                </div>
            </div>
        </div>
    )
}
