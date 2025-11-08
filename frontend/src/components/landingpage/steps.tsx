import { useEffect, useState } from "react";
import newOrderImg from "../../assets/new-order.png";
import homeImg from "../../assets/home.png";
import ordersImg from "../../assets/orders.png";

export const Steps = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.1 }
        );

        const element = document.getElementById("how-it-works");
        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, []);

    const steps = [
        {
            step: "Step 1",
            title: "Login & Create New Order",
            description: "After logging in, create a new order with customer details and order information. The system will automatically send an email with invoice to the customer.",
            image: newOrderImg,
            imageAlt: "New Order Creation",
            imagePosition: "left" as const
        },
        {
            step: "Step 2",
            title: "View and Update Orders",
            description: "You can view and update orders from the home page. Track pending orders, manage delivery dates, and update order statuses all in one place.",
            image: homeImg,
            imageAlt: "Home Page Dashboard",
            imagePosition: "right" as const
        },
        {
            step: "Step 3",
            title: "Manage Orders Data",
            description: "Comprehensive order management system where you can track all orders, search for specific orders, view complete order details, and manage your entire order database efficiently.",
            image: ordersImg,
            imageAlt: "Orders Management",
            imagePosition: "left" as const
        }
    ];

    return (
        <div id="how-it-works" className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl  tracking-tighter sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        How It Works
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                        Get started with Design Desk in three simple steps
                    </p>
                </div>

                {/* Steps */}
                <div className="space-y-16 sm:space-y-20 lg:space-y-24">
                    {steps.map((stepItem, index) => {
                        const isImageLeft = stepItem.imagePosition === "left";
                        
                        return (
                            <div
                                key={index}
                                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                                    isImageLeft ? "" : ""
                                }`}
                            >
                                {/* Image Column */}
                                <div
                                    className={`order-1 ${isImageLeft ? "lg:order-1" : "lg:order-2"} flex items-center group cursor-pointer ${
                                        isVisible
                                            ? "opacity-100 translate-x-0"
                                            : isImageLeft
                                            ? "opacity-0 -translate-x-8"
                                            : "opacity-0 translate-x-8"
                                    } transition-all duration-700 ease-out`}
                                    style={{ transitionDelay: `${index * 200}ms` }}
                                >
                                    <div className="relative rounded-lg overflow-hidden shadow-2xl w-full group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-300 ease-out bg-gray-100 p-4 sm:p-6">
                                        <div className="relative bg-white rounded-lg overflow-hidden">
                                            <img
                                                src={stepItem.image}
                                                alt={stepItem.imageAlt}
                                                className="w-full h-auto object-contain group-hover:opacity-70 transition-opacity duration-300"
                                            />
                                            {/* Dark overlay on hover */}
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 ease-out pointer-events-none rounded-lg"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Column */}
                                <div
                                    className={`order-2 ${isImageLeft ? "lg:order-2" : "lg:order-1"} flex flex-col justify-center ${
                                        isVisible
                                            ? "opacity-100 translate-x-0"
                                            : isImageLeft
                                            ? "opacity-0 translate-x-8"
                                            : "opacity-0 -translate-x-8"
                                    } transition-all duration-700 ease-out`}
                                    style={{ transitionDelay: `${index * 200 + 100}ms` }}
                                >
                                    <div className="mb-4">
                                        <span className="text-[#875479] font-bold text-lg sm:text-xl">
                                            {stepItem.step}
                                        </span>
                                    </div>
                                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                                        {stepItem.title}
                                    </h3>
                                    <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                                        {stepItem.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

