import { FaHeadset, FaShieldAlt, FaClipboardList, FaPlaneDeparture, FaChild } from "react-icons/fa";

const reasons = [
    {
        icon: <FaHeadset size={24} />,
        title: "24-hour support",
        description: "Call, message or face-to-face — we’re here for you 24/7, every step of your holiday.",
    },
    {
        icon: <FaShieldAlt size={24} />,
        title: "ATOL Protection",
        description: "You’re protected with refund guarantees on eligible bookings.",
    },
    {
        icon: <FaClipboardList size={24} />,
        title: "No hidden fees",
        description: "We’re totally transparent on what’s covered in your booking.",
    },
    {
        icon: <FaPlaneDeparture size={24} />,
        title: "Fly local",
        description: "Fly from over 20 UK airports for a more convenient trip.",
    },
    {
        icon: <FaChild size={24} />,
        title: "Family perks",
        description: "Free kids’ places available on selected holidays.",
    },
];

export default function WhyBookWithUs() {
    return (
        <section className="container m-auto bg-white py-14 border-t border-b">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-10">
                    Reasons to book with <span className="text-orange-600">Flyaway Finds</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {reasons.map((item, index) => (
                        <div key={index} className="flex flex-col items-center text-center space-y-3 px-4">
                            <div className="text-orange-600">{item.icon}</div>
                            <h3 className="font-semibold text-gray-700">{item.title}</h3>
                            <p className="text-sm text-gray-500">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}