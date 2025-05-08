import {
    Heart,
    Utensils,
    Clock,
    Users,
} from "lucide-react";
import { JSX } from "react";

type Category = {
    id: number;
    label: string;
    icon: JSX.Element;
};

const categories: Category[] = [
    {
        id: 1,
        label: "Couples holidays",
        icon: <Heart className="w-6 h-6 text-orange-500" />,
    },
    {
        id: 2,
        label: "All inclusive holidays",
        icon: <Utensils className="w-6 h-6 text-orange-500" />,
    },
    {
        id: 3,
        label: "Last minute holidays",
        icon: <Clock className="w-6 h-6 text-orange-500" />,
    },
    {
        id: 4,
        label: "Family holidays",
        icon: <Users className="w-6 h-6 text-orange-500" />,
    },
];

export default function HolidayCategories() {
    return (
        <section className="bg-gray-50 py-14">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="bg-white border rounded-xl p-5 flex items-center space-x-4 hover:shadow-md cursor-pointer transition"
                        >
                            <div className="bg-orange-100 p-3 rounded-full">{category.icon}</div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-800">{category.label}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}