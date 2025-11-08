export const Testimonials = () => {
    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Business Owner",
            company: "Tech Solutions Inc.",
            content: "Design Desk has transformed how we manage our orders and customers. The automatic invoicing feature alone saves us hours every week!",
            rating: 5
        },
        {
            name: "Michael Chen",
            role: "Operations Manager",
            company: "Retail Pro",
            content: "Managing workers and payments has never been easier. The platform is intuitive and the customer support is exceptional.",
            rating: 5
        },
        {
            name: "Emily Rodriguez",
            role: "CEO",
            company: "Fashion Forward",
            content: "We've seen a 40% increase in efficiency since switching to Design Desk. Highly recommend it to any business looking to streamline operations.",
            rating: 5
        }
    ];

    return (
        <div id="testimonials" className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#f5eef4]">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl tracking-tighter sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Testimonials
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                        See what our customers have to say about Design Desk
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="flex mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className="w-5 h-5 text-yellow-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-sm sm:text-base text-gray-700 mb-6 leading-relaxed italic">
                                "{testimonial.content}"
                            </p>
                            <div className="border-t border-gray-200 pt-4">
                                <p className="font-semibold text-gray-900 text-sm sm:text-base">
                                    {testimonial.name}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {testimonial.role}, {testimonial.company}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

