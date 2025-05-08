type PackageDeal = {
    id: number;
    image: string;
    title: string;
    location: string;
    originalPrice: string;
    price: string;
    discount: string;
    deposit: string;
    rating: number;
    reviews: number;
    badge?: string;
};

const deals: PackageDeal[] = [
    {
        id: 1,
        image: "https://gotrip-appdir.vercel.app/img/destinations/3/3.png",
        title: "Caribbean Village Agador",
        location: "Agadir, Morocco",
        originalPrice: "£410",
        price: "£309",
        discount: "25% below peak price",
        deposit: "£25 pp deposit",
        rating: 4.3,
        reviews: 2866,
        badge: "Payday deal",
    },
    {
        id: 2,
        image: "https://gotrip-appdir.vercel.app/img/destinations/3/4.png",
        title: "Muthu Clube Praia Da Oura",
        location: "Albufeira, Algarve, Portugal",
        originalPrice: "£351",
        price: "£219",
        discount: "38% below peak price",
        deposit: "£25 pp deposit",
        rating: 4.5,
        reviews: 6066,
        badge: "Payday deal",
    },
    {
        id: 3,
        image: "https://gotrip-appdir.vercel.app/img/destinations/3/5.png",
        title: "AX Odycy",
        location: "St Paul’s Bay, Malta",
        originalPrice: "£543",
        price: "£339",
        discount: "38% below peak price",
        deposit: "£25 pp deposit",
        rating: 4.2,
        reviews: 1804,
        badge: "Payday deal",
    },
];

export default function PopularPackages() {
    return (
        <section className="py-14 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
                    Top Holiday Picks This Week
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {deals.map((deal) => (
                        <div
                            key={deal.id}
                            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
                        >
                            <div className="relative overflow-hidden">
                                <img
                                    src={deal.image}
                                    alt={deal.title}
                                    className="w-full h-[200px] object-cover group-hover:scale-110 duration-500 transition"
                                />
                                {deal.badge && (
                                    <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                    {deal.badge}
                  </span>
                                )}
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-base text-gray-800">
                                    {deal.title}
                                </h3>
                                <p className="text-sm text-slate-500">{deal.location}</p>
                                <div className="flex items-center gap-1 text-xs text-gray-600 mt-2">
                                    ⭐ {deal.rating} ({deal.reviews.toLocaleString()} reviews)
                                </div>

                                <div className="mt-3">
                                    <div className="text-sm text-gray-500 line-through">
                                        {deal.originalPrice} pp
                                    </div>
                                    <div className="text-xl font-bold text-orange-600">
                                        {deal.price} pp
                                    </div>
                                </div>

                                <div className="mt-2">
                  <span className="text-xs bg-red-100 text-red-600 font-medium px-2 py-1 rounded mr-2">
                    {deal.discount}
                  </span>
                                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                    {deal.deposit}
                  </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
