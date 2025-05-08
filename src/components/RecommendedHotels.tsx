type Hotel = {
    id: number;
    name: string;
    location: string;
    image: string;
    tag?: string;
    rating: number;
    reviews: number;
    price: number;
};

const hotels: Hotel[] = [
    {
        id: 1,
        name: "The Montcalm At Brewery London City",
        location: "Westminster Borough, London",
        image:
            "https://gotrip-appdir.vercel.app/_next/image?url=%2Fimg%2Fhotels%2F1.png&w=640&q=75",
        tag: "Breakfast Included",
        rating: 4.7,
        reviews: 3014,
        price: 445,
    },
    {
        id: 2,
        name: "Staycity Aparthotels Deptford Bridge",
        location: "Ciutat Vella, Barcelona",
        image:
            "https://gotrip-appdir.vercel.app/_next/image?url=%2Fimg%2Fhotels%2F2.png&w=640&q=75",
        rating: 4.8,
        reviews: 2345,
        price: 840,
    },
    {
        id: 3,
        name: "The Westin New York at Times Square",
        location: "Manhattan, New York",
        image:
            "https://gotrip-appdir.vercel.app/_next/image?url=%2Fimg%2Fhotels%2F3.png&w=640&q=75",
        tag: "Best Seller",
        rating: 4.7,
        reviews: 4589,
        price: 445,
    },
    {
        id: 4,
        name: "DoubleTree by Hilton Times Square West",
        location: "Vaticano Prati, Rome",
        image:
            "https://gotrip-appdir.vercel.app/_next/image?url=%2Fimg%2Fhotels%2F4.png&w=640&q=75",
        tag: "Top Rated",
        rating: 4.5,
        reviews: 5633,
        price: 568,
    },
];

export default function RecommendedHotels() {
    return (
        <section className="py-14 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
                        Handpicked Holiday Deals
                    </h2>
                    <a
                        href="#"
                        className="text-xs font-semibold px-4 py-2 bg-slate-200 hover:bg-orange-700 hover:text-white rounded-full transition"
                    >
                        View More
                    </a>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {hotels.map((hotel) => (
                        <div
                            key={hotel.id}
                            className="group relative overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-md transition"
                        >
                            <div className="relative overflow-hidden rounded-md">
                                <img
                                    src={hotel.image}
                                    alt={hotel.name}
                                    className="group-hover:scale-110 duration-500 object-cover w-full h-[200px]"
                                />
                                {hotel.tag && (
                                    <div className="absolute top-2 left-2 bg-orange-700 text-white text-[12px] px-2 py-1 font-medium rounded-full text-xs">
                                        {hotel.tag}
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <h3 className="text-sm font-semibold hover:text-orange-600 transition line-clamp-2">
                                    {hotel.name}
                                </h3>
                                <p className="text-sm text-slate-500">{hotel.location}</p>
                                <div className="flex items-center mt-3 text-xs gap-2">
                  <span className="bg-orange-600 text-white px-1.5 py-0.5 rounded-md font-bold">
                    {hotel.rating}
                  </span>
                                    <span className="font-semibold text-sm">Exceptional</span>
                                    <span className="text-slate-500 ml-auto">{hotel.reviews} reviews</span>
                                </div>
                                <div className="mt-4 text-2xl font-semibold flex items-baseline">
                                    £{hotel.price}
                                    <span className="text-sm font-bold ml-1">pp</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

