"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Courses", href: "/courses" },
        { name: "Sell With Us", href: "/sell-with-us" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    const isActive = (href: string) => pathname === href;

    return (
        <header className="bg-white shadow-[0_2px_4px_rgba(0,0,0,0.1)] sticky top-0 z-[1000] w-full">
            <div className="flex items-center justify-between py-4 px-4 md:px-6 max-w-[1280px] mx-auto">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-[#2D6DF6] no-underline transition-colors duration-[200ms] hover:text-[#1a4fd6]">
                    Skillverge
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <ul className="flex items-center gap-6 list-none m-0 p-0">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className={`text-base font-medium no-underline py-2 px-3 rounded-lg transition-all duration-[200ms] relative ${isActive(link.href)
                                        ? "text-[#2D6DF6] font-semibold after:content-[''] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-[#2D6DF6]"
                                        : "text-[#1A1F36] hover:text-[#2D6DF6] hover:bg-[#F8F9FB]"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/login"
                            className="inline-block py-2 px-5 text-sm font-medium text-center rounded-none transition-all duration-[300ms] cursor-pointer no-underline leading-[1.5] bg-transparent text-[#2D6DF6] border-2 border-[#2D6DF6] hover:bg-[#2D6DF6] hover:text-white hover:-translate-y-0.5"
                        >
                            Login
                        </Link>
                        <Link
                            href="/signup"
                            className="inline-block py-2 px-5 text-sm font-medium text-center rounded-none transition-all duration-[300ms] cursor-pointer no-underline leading-[1.5] bg-[#2D6DF6] text-white hover:bg-[#1a4fd6] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(45,109,246,0.2)]"
                        >
                            Sign Up
                        </Link>
                    </div>
                </nav>

                {/* Mobile Toggle */}
                <button
                    className={`md:hidden flex flex-col justify-center items-center w-10 h-10 bg-none border-none cursor-pointer p-0 z-[1001] ${isOpen ? 'active' : ''}`}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle navigation menu"
                    aria-expanded={isOpen}
                >
                    <span className={`relative w-6 h-0.5 bg-[#1A1F36] transition-all duration-[300ms] ${isOpen ? 'bg-transparent' : ''} before:content-[''] before:absolute before:w-6 before:h-0.5 before:bg-[#1A1F36] before:transition-all before:duration-[300ms] ${isOpen ? 'before:top-0 before:rotate-45' : 'before:-top-2'} after:content-[''] after:absolute after:w-6 after:h-0.5 after:bg-[#1A1F36] after:transition-all after:duration-[300ms] ${isOpen ? 'after:bottom-0 after:-rotate-45' : 'after:-bottom-2'}`}></span>
                </button>
            </div>

            {/* Mobile Drawer */}
            <div className={`fixed top-0 right-0 w-64 h-full bg-white shadow-[0_0_20px_rgba(0,0,0,0.2)] transform transition-transform duration-[300ms] ease-in-out z-[999] md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
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
                    </ul>
                    <div className="mt-auto flex flex-col gap-4">
                        <Link
                            href="/login"
                            className="inline-block py-3 px-5 text-sm font-medium text-center rounded-none transition-all duration-[300ms] cursor-pointer no-underline leading-[1.5] bg-transparent text-[#2D6DF6] border-2 border-[#2D6DF6] hover:bg-[#2D6DF6] hover:text-white"
                            onClick={() => setIsOpen(false)}
                        >
                            Login
                        </Link>
                        <Link
                            href="/signup"
                            className="inline-block py-3 px-5 text-sm font-medium text-center rounded-none transition-all duration-[300ms] cursor-pointer no-underline leading-[1.5] bg-[#2D6DF6] text-white hover:bg-[#1a4fd6]"
                            onClick={() => setIsOpen(false)}
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-[998] md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </header>
    );
}
