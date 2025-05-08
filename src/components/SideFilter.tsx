"use client";

export default function SideFilter({ filters, handleFilterChange }) {
    const boardTypeOptions = [
        "ROOM_ONLY",
        "BREAKFAST",
        "HALF_BOARD",
        "FULL_BOARD",
        "ALL_INCLUSIVE",
    ];

    const amenitiesOptions = {
        'Hotel Facilities': [
            "AIR_CONDITIONING",
            "WIFI",
            "WI-FI_IN_ROOM",
            "TELEVISION",
            "MINIBAR",
            "ROOM_SERVICE",
            "GUARDED_PARKG",
            "VALET_PARKING",
            "PARKING",
            "JACUZZI",
            "SAUNA",
            "SOLARIUM",
            "MASSAGE",
            "KIDS_WELCOME",
            "BABY-SITTING",
            "PETS_ALLOWED",
            "DISABLED_FACILITIES",
        ],
        'Leisure Facilities': [
            "FITNESS_CENTER",
            "BEACH",
            "POOL",
            "GOLF",
            "TENNIS",
            "CASINO",
            "ANIMAL_WATCHING",
        ],
        'Dining Facilities': [
            "RESTAURANT",
            "BAR",
            "LOUNGE",
        ],
    };

    return (
        <aside className="md:col-span-1">
            <div className="border p-4 rounded-lg shadow">
                <label className="block mb-2">
                    <input
                        type="checkbox"
                        name="nonStop"
                        className="mr-2"
                        checked={filters.nonStop}
                        onChange={handleFilterChange}
                    />{" "}
                    Non-Stop Flights
                </label>
                <div className="mt-4">
                    <h3 className="font-semibold mb-2">Hotel Rating</h3>
                    {["5", "4", "3"].map((rating) => (
                        <label key={rating} className="block mb-2">
                            <input
                                type="checkbox"
                                name={`rating${rating}`}
                                className="mr-2"
                                checked={filters.ratings.includes(rating)}
                                onChange={handleFilterChange}
                            />{" "}
                            {rating} Stars
                        </label>
                    ))}
                </div>
                <div className="mt-4">
                    <h3 className="font-semibold mb-2">Board Type</h3>
                    {boardTypeOptions.map((type) => (
                        <label key={type} className="block mb-2">
                            <input
                                type="checkbox"
                                name={type}
                                className="mr-2"
                                checked={filters.boardTypes.includes(type)}
                                onChange={handleFilterChange}
                            />{" "}
                            {type.replace(/_/g, " ")}
                        </label>
                    ))}
                </div>
                <div className="mt-4">
                    {Object.entries(amenitiesOptions).map(([category, amenities]) => (
                        <div key={category} className="mb-4">
                            <h4 className="font-medium mb-1">{category}</h4>
                            {amenities.map((amenity) => (
                                <label key={amenity} className="block mb-1 ml-2">
                                    <input
                                        type="checkbox"
                                        name={amenity}
                                        className="mr-2"
                                        checked={filters.amenities.includes(amenity)}
                                        onChange={handleFilterChange}
                                    />{" "}
                                    {amenity.replace(/_/g, " ")}
                                </label>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
}
