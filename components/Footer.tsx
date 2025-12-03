import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-secondary text-white pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <h4 className="text-2xl font-bold mb-4">Skillverge</h4>
                        <p className="text-gray-300 leading-relaxed">
                            Affordable online learning for everyone. Upgrade your skills with courses starting from ₹100.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link href="/courses" className="text-gray-300 hover:text-white transition-colors">Courses</Link></li>
                            <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">About</Link></li>
                            <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
                            <li><Link href="/sell-with-us" className="text-gray-300 hover:text-white transition-colors">Sell With Us</Link></li>
                        </ul>
                    </div>

                    {/* Socials */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-300 hover:text-white transition-colors"><Facebook size={24} /></a>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors"><Twitter size={24} /></a>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors"><Instagram size={24} /></a>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors"><Linkedin size={24} /></a>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors"><Youtube size={24} /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
                    <p>Copyright © Skillverge 2025</p>
                </div>
            </div>
        </footer>
    );
}
