import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-[#0f111a] text-white pt-20 pb-10 mt-auto border-t border-white/5 relative overflow-hidden">
            {/* Decorative top border gradient */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#2D6DF6] to-transparent opacity-50"></div>

            <div className="max-w-[1280px] mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 relative z-10">
                {/* Brand Column */}
                <div>
                    <h4 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-6">Skillverge</h4>
                    <p className="text-sm text-gray-400 font-medium mb-2">
                        Alenova Technologies Pvt Ltd
                    </p>
                    <p className="text-sm text-gray-400 leading-relaxed mb-6">
                        Empowering learners and creators through affordable, quality education. Join thousands of students and instructors on India's fastest-growing EdTech platform.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2D6DF6]"></span>
                        Quick Links
                    </h4>
                    <ul className="space-y-3">
                        {[
                            { name: "Home", href: "/" },
                            { name: "Courses", href: "/courses" },
                            { name: "Sell With Us", href: "/seller/register" },
                            { name: "About", href: "/about" },
                            { name: "Contact", href: "/contact" },
                        ].map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className="text-sm text-gray-400 hover:text-[#2D6DF6] transition-all duration-300 inline-block hover:translate-x-1"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Legal Links */}
                <div>
                    <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2D6DF6]"></span>
                        Legal
                    </h4>
                    <ul className="space-y-3">
                        {[
                            { name: "Terms & Conditions", href: "/terms-conditions" },
                            { name: "Privacy Policy", href: "/privacy-policy" },
                            { name: "Refund Policy", href: "/refund-policy" },
                            { name: "Chargeback Policy", href: "/chargeback-policy" },
                            { name: "Shipping Policy", href: "/shipping-policy" },
                            { name: "Delivery Policy", href: "/delivery-policy" },
                            { name: "Cancellation Policy", href: "/cancellation-policy" },
                        ].map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className="text-sm text-gray-400 hover:text-[#2D6DF6] transition-all duration-300 inline-block hover:translate-x-1"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Us */}
                <div>
                    <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2D6DF6]"></span>
                        Contact Us
                    </h4>
                    <ul className="space-y-4 text-sm text-gray-400">
                        <li className="flex items-start gap-4 group">
                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-[#2D6DF6]/10 transition-colors">
                                <i className="bi bi-geo-alt text-[#2D6DF6]"></i>
                            </div>
                            <span className="leading-relaxed">
                                No-70/5, 2nd Floor,<br />
                                Shamanna Reddy Building,<br />
                                Bommanahalli, Bangalore - 560068
                            </span>
                        </li>
                        <li className="flex items-center gap-4 group">
                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-[#2D6DF6]/10 transition-colors">
                                <i className="bi bi-telephone text-[#2D6DF6]"></i>
                            </div>
                            <a href="tel:+919916190863" className="hover:text-white transition-colors">
                                +91 9916190863
                            </a>
                        </li>
                        <li className="flex items-center gap-4 group">
                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-[#2D6DF6]/10 transition-colors">
                                <i className="bi bi-envelope text-[#2D6DF6]"></i>
                            </div>
                            <a href="mailto:skillverge@alenovatech.com" className="hover:text-white transition-colors break-words">
                                skillverge@alenovatech.com
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="max-w-[1280px] mx-auto px-4 md:px-6 relative z-10">
                <div className="pt-8 border-t border-white/5 text-center">
                    <p className="text-xs text-gray-500">
                        © {new Date().getFullYear()} Skillverge • Alenova Technologies Pvt Ltd • Bangalore
                    </p>
                </div>
            </div>
        </footer>
    );
}
