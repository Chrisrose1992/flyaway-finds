type Destination = {
    id: number;
    image: string;
    name: string;
    subtitle: string;
};

const destinations: Destination[] = [
    {
        id: 1,
        image: "https://gotrip-appdir.vercel.app/img/destinations/3/3.png",
        name: "France",
        subtitle: "Weekend getaways starting at £150",
    },
    {
        id: 2,
        image: "https://gotrip-appdir.vercel.app/img/destinations/3/4.png",
        name: "Turkey",
        subtitle: "Weekend getaways starting at £150",
    },
    {
        id: 3,
        image: "https://gotrip-appdir.vercel.app/img/destinations/3/5.png",
        name: "Spain",
        subtitle: "Weekend getaways starting at £150",
    },
    {
        id: 4,
        image: "https://gotrip-appdir.vercel.app/img/destinations/3/1.png",
        name: "Italy",
        subtitle: "Weekend getaways starting at £150",
    },
];

export default function DestinationHighlights() {
    return (
        <section className="py-14 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
                    Deals You Don’t Want to Miss
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {destinations.map((dest) => (
                        <div
                            key={dest.id}
                            className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
                        >
                            <div className="relative overflow-hidden rounded-t-xl">
                                <img
                                    src={dest.image}
                                    alt={dest.name}
                                    className="w-full h-[200px] object-cover group-hover:scale-110 transition duration-500"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-sm font-semibold mb-1 group-hover:text-orange-600 transition">
                                    {dest.name}
                                </h3>
                                <p className="text-sm text-slate-500">{dest.subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

