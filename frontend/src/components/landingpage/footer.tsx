import { useNavigate } from "react-router-dom";

export const Footer = () => {
    const navigate = useNavigate();

    const handleNavClick = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <footer className="w-full bg-[#875479] text-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-1">
                        <h3 className="text-2xl font-bold mb-4">
                            Design <span className="text-[#f5eef4]">Desk.</span>
                        </h3>
                        <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-4">
                            Streamline your business operations with our all-in-one order and customer management platform.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-3">
                            <li>
                                <button
                                    onClick={() => handleNavClick("home")}
                                    className="text-white/80 hover:text-white transition-colors duration-200 text-sm sm:text-base"
                                >
                                    Home
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleNavClick("how-it-works")}
                                    className="text-white/80 hover:text-white transition-colors duration-200 text-sm sm:text-base"
                                >
                                    How It Works
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleNavClick("features")}
                                    className="text-white/80 hover:text-white transition-colors duration-200 text-sm sm:text-base"
                                >
                                    Features
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => navigate("/signup")}
                                    className="text-white/80 hover:text-white transition-colors duration-200 text-sm sm:text-base"
                                >
                                    Sign Up
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Resources</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-white/80 hover:text-white transition-colors duration-200 text-sm sm:text-base">
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white/80 hover:text-white transition-colors duration-200 text-sm sm:text-base">
                                    Support
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white/80 hover:text-white transition-colors duration-200 text-sm sm:text-base">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white/80 hover:text-white transition-colors duration-200 text-sm sm:text-base">
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="mailto:support@designdesk.com" className="text-white/80 hover:text-white transition-colors duration-200 text-sm sm:text-base">
                                    support@designdesk.com
                                </a>
                            </li>
                            <li>
                                <a href="tel:+1234567890" className="text-white/80 hover:text-white transition-colors duration-200 text-sm sm:text-base">
                                    +1 (234) 567-890
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/20 mt-8 sm:mt-12 pt-6 sm:pt-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-white/60 text-xs sm:text-sm text-center sm:text-left">
                            © {new Date().getFullYear()} Design Desk. All rights reserved.
                        </p>
                        <div className="flex gap-4 sm:gap-6">
                            <a href="#" className="text-white/60 hover:text-white transition-colors duration-200 text-xs sm:text-sm">
                                Twitter
                            </a>
                            <a href="#" className="text-white/60 hover:text-white transition-colors duration-200 text-xs sm:text-sm">
                                LinkedIn
                            </a>
                            <a href="#" className="text-white/60 hover:text-white transition-colors duration-200 text-xs sm:text-sm">
                                Facebook
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

