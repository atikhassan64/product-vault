
import { FaFacebook, FaXTwitter, FaInstagram, FaLinkedin } from "react-icons/fa6";
import React from 'react'

export default function Footer() {
    return (
        <div>
            <footer className=" text-gray-900 pt-10 mt-10 bg-white">
                <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-4 sm:grid-cols-2 gap-8">

                    {/* Logo + Description */}
                    <div>
                        <div className="flex items-center space-x-2 mb-3">
                            <img
                                src="https://cdn.prod.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e3a57bdb30414bf9cea_Product_Dark.svg"
                                alt="Logo"
                                className="h-10 w-28 bg-cover"
                            />
                        </div>
                        <p className="text-sm text-gray-900">
                            Keep everything organized—from product details to analytics—in one powerful system.
                        </p>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold text-indigo-600 mb-3">Contact Us</h3>
                        <ul className="space-y-2 text-sm">
                            <li>Email: <a className="hover:text-gray-500 cursor-pointer">support@finease.com</a></li>
                            <li>Phone: <a className="hover:text-gray-500 cursor-pointer">+880 131518-7164</a></li>
                            <li>Location: Dhaka, Bangladesh</li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-lg font-semibold text-indigo-600 mb-3">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a className="hover:text-gray-500 cursor-pointer">Terms & Conditions</a></li>
                            <li><a className="hover:text-gray-500 cursor-pointer">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-lg font-semibold text-indigo-600 mb-3">Follow Us</h3>
                        <div className="flex space-x-4 text-xl">
                            <a href="https://facebook.com" target="_blank" rel="" className="">
                                <FaFacebook />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="" className="">
                                <FaXTwitter />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="" className="">
                                <FaInstagram />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="" className="">
                                <FaLinkedin />
                            </a>
                        </div>
                    </div>

                </div>

                <div className="text-center text-sm text-gray-500 mt-10 border-t border-indigo-600 py-4">
                    © {new Date().getFullYear()} FinEase. All rights reserved.
                </div>
            </footer>
        </div>
    )
}
