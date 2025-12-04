import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-[#1A1F36] text-white pt-16 pb-6 mt-auto">
            <div className="max-w-[1280px] mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
                {/* Brand Column */}
                <div>
                    <h4 className="text-lg font-semibold text-white mb-6">Skillverge</h4>
                    <p className="text-sm text-white/80 leading-[1.6] mb-4">
                        Empowering learners and creators through affordable, quality education. Join thousands of students and instructors on India's fastest-growing EdTech platform.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
                    <ul className="list-none p-0 m-0">
                        {[
                            { name: "Home", href: "/" },
                            { name: "Courses", href: "/courses" },
                            { name: "Sell With Us", href: "/sell-with-us" },
                            { name: "About", href: "/about" },
                            { name: "Contact", href: "/contact" },
                        ].map((link) => (
                            <li key={link.name} className="mb-4">
                                <Link
                                    href={link.href}
                                    className="text-sm text-white/80 no-underline transition-all duration-[200ms] inline-block hover:text-white hover:translate-x-1"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Social */}
                <div>
                    <h4 className="text-lg font-semibold text-white mb-6">Connect With Us</h4>
                    <div className="flex gap-4 mt-4">
                        {["facebook", "twitter", "instagram", "linkedin", "youtube"].map((social) => (
                            <a
                                key={social}
                                href={`#${social}`}
                                className="flex items-center justify-center w-10 h-10 bg-white/10 rounded-lg text-white text-xl no-underline transition-all duration-[200ms] hover:bg-[#2D6DF6] hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                                aria-label={social}
                            >
                                <i className={`bi bi-${social}`}></i>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="max-w-[1280px] mx-auto px-4 md:px-6 pt-6 border-t border-white/10 text-center">
                <p className="text-sm text-white/60 m-0">
                    © {new Date().getFullYear()} Skillverge. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
