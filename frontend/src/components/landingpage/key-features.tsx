import { TbShoppingCartBolt } from "react-icons/tb";
import { MdOutlineReceiptLong } from "react-icons/md";
import { IoPeopleOutline } from "react-icons/io5";

export const KeyFeatures = () => {
    const features = [
        {
            icon: <TbShoppingCartBolt size={40} />,
            title: "Create an Order",
            description: "Easily create and manage orders with a simple, intuitive interface. Track order status and details in real-time."
        },
        {
            icon: <MdOutlineReceiptLong size={40} />,
            title: "Automatic Invoice",
            description: "Automatic invoice will be sent to customers. Streamline your billing process and reduce manual work."
        },
        {
            icon: <IoPeopleOutline size={40} />,
            title: "Manage Workers & Payments",
            description: "Efficiently manage your workforce and track their work. Handle payments and payroll seamlessly."
        }
    ];

    return (
        <div id="features" className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#f5eef4]">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl tracking-tighter sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Key Features
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                        Everything you need to run your business efficiently, all in one place.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-6 sm:p-8 bg-white border-2 border-gray-200 rounded-xl hover:border-[#875479] transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                        >
                            <div className="text-[#875479] mb-4 group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

