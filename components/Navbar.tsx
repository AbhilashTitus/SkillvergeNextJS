"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, LogOut } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { useAuth } from "@/lib/AuthContext";

export interface NavbarProps {
    transparent?: boolean;
}

export function Navbar({ transparent = false }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { cartCount } = useCart();
    const { user, logout, isAuthenticated } = useAuth();
    const [isSeller, setIsSeller] = useState(false);

    useEffect(() => {
        const checkSellerStatus = () => {
            const sellerData = localStorage.getItem("sm_new_seller");
            setIsSeller(!!sellerData);
        };

        checkSellerStatus();
        window.addEventListener('storage', checkSellerStatus);
        return () => window.removeEventListener('storage', checkSellerStatus);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Courses", href: "/courses" },
        {
            name: isSeller ? "Seller Dashboard" : "Become a Seller",
            href: isSeller ? "/seller-dashboard" : "/seller/register"
        },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    const isActive = (href: string) => pathname === href;

    return (
        <>
            <header className={`${transparent ? 'bg-transparent backdrop-blur-sm relative' : 'bg-white shadow-[0_2px_4px_rgba(0,0,0,0.1)] sticky'} top-0 z-[1000] w-full transition-colors duration-300`}>
                <div className="flex items-center justify-between py-4 px-4 md:px-6 max-w-[1280px] mx-auto">
                    {/* Logo */}
                    <Link href="/" className={`text-2xl font-bold no-underline transition-colors duration-[200ms] ${transparent ? 'text-white hover:text-white/80 [text-shadow:0_2px_8px_rgba(0,0,0,0.5)]' : 'text-[#2D6DF6] hover:text-[#1a4fd6]'}`}>
                        Skillverge
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        <ul className="flex items-center gap-6 list-none m-0 p-0">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className={`text-base font-medium no-underline py-2 px-3 rounded-lg transition-all duration-[200ms] relative 
                                    ${transparent
                                                ? `[text-shadow:0_2px_4px_rgba(0,0,0,0.3)] ${isActive(link.href) ? "text-white font-semibold after:content-[''] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-white" : "text-white/90 hover:text-white hover:bg-white/10"}`
                                                : `${isActive(link.href) ? "text-[#2D6DF6] font-semibold after:content-[''] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-[#2D6DF6]" : "text-[#1A1F36] hover:text-[#2D6DF6] hover:bg-[#F8F9FB]"}`
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="flex items-center gap-4">
                            {/* Membership Hook - Visible even if NOT authenticated */}
                            {!isAuthenticated && (
                                <Link
                                    href="/membership"
                                    className={`hidden lg:flex items-center px-3 py-1.5 rounded-md border transition-colors text-sm font-semibold mr-2
                                ${transparent
                                            ? 'text-white bg-white/20 border-white/30 hover:bg-white/30 backdrop-blur-md'
                                            : 'text-[#2D6DF6] bg-blue-50 border-blue-100 hover:bg-blue-100'
                                        }`}
                                >
                                    <span className="mr-1">💎</span> Get Premium
                                </Link>
                            )}

                            {/* Coins & Membership - Visible if authenticated */}
                            {isAuthenticated && user && (
                                <div className="hidden lg:flex items-center gap-3 mr-2">
                                    {/* Coins Badge */}
                                    <div className={`flex items-center px-3 py-1.5 rounded-md border shadow-sm text-sm font-medium ${transparent ? 'text-yellow-300 bg-white/10 border-white/20 backdrop-blur-md' : 'text-yellow-700 bg-yellow-50 border-yellow-200'}`}>
                                        <span className="mr-1.5">💰</span> {user.coins || 0}
                                    </div>

                                    {/* Membership Badge */}
                                    {user.membershipTier === 'Free' ? (
                                        <Link
                                            href="/membership"
                                            className={`flex items-center px-3 py-1.5 rounded-md border transition-colors text-sm font-semibold ${transparent ? 'text-white bg-white/20 border-white/30 hover:bg-white/30 backdrop-blur-md' : 'text-indigo-600 bg-indigo-50 border-indigo-200 hover:bg-indigo-100'}`}
                                        >
                                            <span className="mr-1">👑</span> Upgrade
                                        </Link>
                                    ) : (
                                        <Link
                                            href="/membership"
                                            className={`flex items-center px-3 py-1.5 rounded-md border text-sm font-semibold shadow-sm transition-transform hover:scale-105
                                        ${transparent
                                                    ? `backdrop-blur-md ${user.membershipTier === 'Gold' ? 'text-yellow-300 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-300/50' : 'text-gray-200 bg-white/10 border-white/20 hover:bg-white/20'}`
                                                    : `${user.membershipTier === 'Gold' ? 'text-yellow-800 bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-300' : 'text-slate-700 bg-slate-100 border-slate-300 hover:bg-slate-200'}`
                                                }`}
                                        >
                                            <span className="mr-1">
                                                {user.membershipTier === 'Gold' ? '🥇' : '🥈'}
                                            </span>
                                            {user.membershipTier}
                                        </Link>
                                    )}
                                </div>
                            )}

                            {/* Cart Icon */}
                            <Link href="/cart" className={`relative p-2 transition-colors ${transparent ? 'text-white/90 hover:text-white [text-shadow:0_2px_4px_rgba(0,0,0,0.3)]' : 'text-[#1A1F36] hover:text-[#2D6DF6]'}`}>
                                <ShoppingCart className="w-6 h-6" />
                                {cartCount > 0 && (
                                    <span className={`absolute -top-1 -right-1 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white ${transparent ? 'bg-[#FF4757] shadow-lg' : 'bg-[#FF4757]'}`}>
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            {isAuthenticated ? (
                                <div className="relative group">
                                    <button className="flex items-center gap-2 focus:outline-none">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${transparent ? 'bg-white text-[#2D6DF6] shadow-lg' : 'bg-[#2D6DF6] text-white'}`}>
                                            {user?.name.charAt(0).toUpperCase()}
                                        </div>
                                    </button>

                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                        <div className="px-4 py-2 border-b border-gray-100 lg:hidden">
                                            <p className="text-xs text-gray-500 font-medium">Balance</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-yellow-600">💰 {user?.coins || 0}</span>
                                            </div>
                                        </div>
                                        <Link
                                            href="/my-learning"
                                            className="block px-4 py-2 text-sm text-[#1A1F36] hover:bg-gray-100 hover:text-[#2D6DF6]"
                                        >
                                            My Account
                                        </Link>
                                        <Link
                                            href="/membership"
                                            className="block px-4 py-2 text-sm text-[#1A1F36] hover:bg-gray-100 hover:text-[#2D6DF6] lg:hidden"
                                        >
                                            Membership: {user?.membershipTier}
                                        </Link>
                                        <button
                                            onClick={logout}
                                            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 flex items-center gap-2"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className={`inline-block py-2 px-5 text-sm font-medium text-center rounded-none transition-all duration-[300ms] cursor-pointer no-underline leading-[1.5] bg-transparent border-2 hover:-translate-y-0.5 ${transparent ? 'text-white border-white hover:bg-white hover:text-[#2D6DF6] shadow-lg' : 'text-[#2D6DF6] border-[#2D6DF6] hover:bg-[#2D6DF6] hover:text-white'}`}
                                    >
                                        Login
                                    </Link>

                                </>
                            )}
                        </div>
                    </nav>

                    {/* Mobile Toggle & Cart */}
                    <div className="flex items-center gap-4 md:hidden">
                        <button
                            className={`flex flex-col justify-center items-center w-10 h-10 bg-none border-none cursor-pointer p-0 z-[1001] ${isOpen ? 'active' : ''}`}
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle navigation menu"
                            aria-expanded={isOpen}
                        >
                            <span className={`relative w-6 h-0.5 transition-all duration-[300ms] ${transparent ? 'bg-white' : 'bg-[#1A1F36]'} ${isOpen ? 'bg-transparent' : ''} before:content-[''] before:absolute before:w-6 before:h-0.5 before:transition-all before:duration-[300ms] ${transparent ? 'before:bg-white' : 'before:bg-[#1A1F36]'} ${isOpen ? 'before:top-0 before:rotate-45' : 'before:-top-2'} after:content-[''] after:absolute after:w-6 after:h-0.5 after:transition-all after:duration-[300ms] ${transparent ? 'after:bg-white' : 'after:bg-[#1A1F36]'} ${isOpen ? 'after:bottom-0 after:-rotate-45' : 'after:-bottom-2'}`}></span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Drawer */}
            <div className={`fixed top-0 right-0 w-64 h-full bg-white shadow-[0_0_20px_rgba(0,0,0,0.2)] transform transition-transform duration-[300ms] ease-in-out z-[2000] md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-6 flex flex-col h-full pt-20">
                    <ul className="flex flex-col gap-4 list-none m-0 p-0">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className={`block text-lg font-medium no-underline py-2 transition-colors duration-[200ms] ${isActive(link.href) ? "text-[#2D6DF6]" : "text-[#1A1F36] hover:text-[#2D6DF6]"
                                        }`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link
                                href="/cart"
                                className={`flex items-center gap-2 text-lg font-medium no-underline py-2 transition-colors duration-[200ms] ${isActive('/cart') ? "text-[#2D6DF6]" : "text-[#1A1F36] hover:text-[#2D6DF6]"}`}
                                onClick={() => setIsOpen(false)}
                            >
                                Cart
                                <div className="relative">
                                    <ShoppingCart className="w-5 h-5" />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-[#FF4757] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white">
                                            {cartCount}
                                        </span>
                                    )}
                                </div>
                            </Link>
                        </li>

                    </ul>
                    <div className="mt-auto flex flex-col gap-4">
                        {isAuthenticated ? (
                            <div className="flex flex-col gap-4">
                                <Link
                                    href="/my-learning"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <div className="w-10 h-10 rounded-full bg-[#2D6DF6] text-white flex items-center justify-center font-bold text-lg">
                                        {user?.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-[#1A1F36] truncate">{user?.name}</p>
                                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                                    </div>
                                </Link>
                                <button
                                    onClick={() => {
                                        logout();
                                        setIsOpen(false);
                                    }}
                                    className="w-full py-3 px-5 text-sm font-medium text-center rounded-none transition-all duration-[300ms] cursor-pointer no-underline leading-[1.5] bg-transparent text-red-500 border-2 border-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center gap-2"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link
                                    href="/membership"
                                    className="block w-full py-3 px-5 text-sm font-medium text-center rounded-none transition-all duration-[300ms] cursor-pointer no-underline leading-[1.5] bg-blue-50 text-[#2D6DF6] border-2 border-transparent hover:bg-blue-100" // Kept blue styling for drawer as it is white bg drawer
                                    onClick={() => setIsOpen(false)}
                                >
                                    💎 Get Premium
                                </Link>
                                <Link
                                    href="/login"
                                    className="inline-block py-3 px-5 text-sm font-medium text-center rounded-none transition-all duration-[300ms] cursor-pointer no-underline leading-[1.5] bg-transparent text-[#2D6DF6] border-2 border-[#2D6DF6] hover:bg-[#2D6DF6] hover:text-white"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Login
                                </Link>

                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-[1999] md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
