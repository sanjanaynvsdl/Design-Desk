import { useEffect, useState } from "react";
import dashboardImg from "../../assets/dashboard.png";

export const Hero = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger animation on mount
        setIsVisible(true);
    }, []);

    return (
        <div className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-12 overflow-hidden">
            {/* Light gradient from top-left to middle */}
            <div className="absolute top-0 left-0 w-full h-[60%] bg-gradient-to-br from-[#f5eef4]/40 via-[#f5eef4]/20 to-transparent pointer-events-none z-0"></div>
            
            <div className="relative z-10 w-full flex flex-col items-center">
                {/* Tagline with slight background */}
                <div 
                    className={`mb-6 px-4 py-2 bg-[#f5eef4] rounded-full inline-block transition-all duration-700 ease-out ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                    }`}
                >
                    <p className="text-sm sm:text-base text-[#875479] font-semibold">
                        All-in-One Business Management Platform
                    </p>
                </div>

                {/* Hero Text - Centered */}
                <div className="text-center max-w-4xl mx-auto mb-8">
                    <h1 
                        className={`text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tighter transition-all duration-700 ease-out delay-150 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                        }`}
                    >
                        Manage Your Orders, Customers & Business Data
                    </h1>
        
                    <p 
                        className={`text-sm sm:text-base md:text-lg text-gray-600 transition-all duration-700 ease-out delay-300 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                        }`}
                    >
                        Say goodbye to scattered spreadsheets and lost information. Keep everything organized, accessible, and actionable in one powerful workspace.
                    </p>
                </div>

                {/* CTA Button */}
                {/* <button 
                    onClick={() => navigate("/signup")}
                    className="px-6 sm:px-8 py-3 sm:py-4 bg-[#875479] text-white font-semibold text-base sm:text-lg rounded-lg hover:bg-[#9c668f] transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 mb-8 sm:mb-12"
                >
                    Get Started
                </button> */}

                {/* Dashboard Image with Pink Text Mask - Closer and Centered */}
                <div 
                    className={`relative w-full max-w-5xl mx-auto mt-4 transition-all duration-1000 ease-out delay-500 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                >
                    <div className="relative overflow-hidden rounded-lg shadow-2xl">
                        <img 
                            src={dashboardImg} 
                            alt="Design Desk Dashboard" 
                            className="w-full h-auto"
                        />
                        {/* Gradient mask fade out from 60% of image */}
                        <div 
                            className="absolute inset-0 rounded-lg pointer-events-none"
                            style={{ 
                                background: 'linear-gradient(to bottom, transparent 0%, transparent 50%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.7) 80%, white 100%)'
                            }}
                        ></div>
                        {/* Pink overlay mask for text effect */}
                        <div className="absolute inset-0 bg-gradient-to-b from-[#875479]/5 via-[#875479]/15 to-[#875479]/25 rounded-lg pointer-events-none mix-blend-overlay"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}