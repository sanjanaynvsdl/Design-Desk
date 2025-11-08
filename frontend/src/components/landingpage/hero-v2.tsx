import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import womenAtDesk from "../../assets/womenAtDesk2.png";

export const HeroV2 = () => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger animation on mount
        setIsVisible(true);
    }, []);

    return (
        <div id="home" className="relative w-full min-h-screen flex items-center px-4 sm:px-6 lg:px-8 pt-24 pb-12 overflow-hidden bg-[#875479]">
            <div className="max-w-6xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Left Column - Text Content */}
                    <div className="flex flex-col justify-center space-y-6">
                        {/* Tagline */}
                        <div 
                            className={`transition-all duration-700 ease-out ${
                                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
                            }`}
                        >
                            <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full inline-block">
                                <p className="text-sm sm:text-base text-white font-semibold">
                                    All-in-One Business Management Platform
                                </p>
                            </div>
                        </div>

                        {/* Main Heading */}
                        <h1 
                            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tighter transition-all duration-700 ease-out delay-150 ${
                                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
                            }`}
                        >
                            Manage Your Orders, Customers <span className="text-[#362130]">& Business Data</span>
                        </h1>
        
                        {/* Description */}
                        <p 
                            className={`text-base sm:text-lg md:text-xl text-[#ecdeea] leading-relaxed transition-all duration-700 ease-out delay-300 ${
                                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
                            }`}
                        >
                            Say goodbye to scattered spreadsheets and lost information. Keep everything organized, accessible, and actionable in one powerful workspace.
                        </p>

                        {/* CTA Button */}
                        <div 
                            className={`transition-all duration-700 ease-out delay-500 cursor-pointer   ${
                                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
                            }`}
                        >
                            <button 
                                onClick={() => navigate("/signup")}
                                className="px-6 sm:px-8 py-3 sm:py-4  cursor-pointer bg-white text-[#362130] font-semibold text-base sm:text-lg rounded-lg hover:bg-[#ecdeea] transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                            >
                                Get Started
                            </button>
                        </div>
                    </div>

                    {/* Right Column - Image */}
                    <div 
                        className={`flex justify-center lg:justify-end transition-all duration-1000 ease-out delay-500 ${
                            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                        }`}
                    >
                        <img 
                            src={womenAtDesk} 
                            alt="Woman at Desk" 
                            className="w-full max-w-md max-h-[500px] h-auto object-contain"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

