"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Static list of airports with codes
const airports = [
    { name: "Belfast", code: "BFS" },
    { name: "Birmingham", code: "BHX" },
    { name: "Bournemouth", code: "BOH" },
    { name: "Bristol", code: "BRS" },
    { name: "Cardiff", code: "CWL" },
    { name: "East Midlands", code: "EMA" },
    { name: "Edinburgh", code: "EDI" },
    { name: "Exeter", code: "EXT" },
    { name: "Glasgow International", code: "GLA" },
    { name: "Glasgow Prestwick", code: "PIK" },
    { name: "Leeds Bradford", code: "LBA" },
    { name: "Liverpool", code: "LPL" },
    { name: "London Gatwick", code: "LGW" },
    { name: "London Luton", code: "LTN" },
    { name: "London Southend", code: "SEN" },
    { name: "London Stansted", code: "STN" },
    { name: "Manchester", code: "MAN" },
    { name: "Newcastle", code: "NCL" },
];

// Static list of regions with corresponding airport codes
const regions = [
    { name: "London Airports", codes: ["LGW", "LTN", "SEN", "STN"] },
    { name: "Midlands Airports", codes: ["BHX", "EMA"] },
    { name: "North East Airports", codes: ["NCL", "LBA"] },
    { name: "North West Airports", codes: ["MAN", "LPL"] },
    { name: "Scotland Airports", codes: ["EDI", "GLA", "PIK"] },
    { name: "South West Airports", codes: ["BRS", "BOH", "EXT", "CWL"] },
];

export default function SearchForm() {
    const router = useRouter();

    type Destination = {
        iataCode: string;
        name: string;
        city: string;
        country: string;
    };

    // State definitions
    const [activeTab, setActiveTab] = useState("Package Holiday");
    const tabs = ["Package Holiday", "Hotels"];
    const [isAnyAirport, setIsAnyAirport] = useState(true);
    const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
    const [selectedAirports, setSelectedAirports] = useState<string[]>([]);
    const [showAirportDropdown, setShowAirportDropdown] = useState(false);
    const [destination, setDestination] = useState<string>("");
    const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
    const [destinationList, setDestinationList] = useState<Destination[]>([]);
    const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);
    const [duration, setDuration] = useState("7 Nights");
    const [rooms, setRooms] = useState(1);
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [childAges, setChildAges] = useState<number[]>([]);
    const [infants, setInfants] = useState(0);
    const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);
    const [departureDate, setDepartureDate] = useState("");
    const [isFlexible, setIsFlexible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch destinations based on input
    useEffect(() => {
        if (destination.length < 2) {
            setDestinationList([]);
            return;
        }
        const fetchDestinations = async () => {
            try {
                const response = await fetch(`/api/destinations?query=${destination}`);
                const data = await response.json();
                setDestinationList(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching destinations:", error);
                setDestinationList([]);
            }
        };
        const debounce = setTimeout(fetchDestinations, 300);
        return () => clearTimeout(debounce);
    }, [destination]);

    // Prefill form from URL parameters
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const departureParam = params.get("departure") || "ANY";
        const destinationParam = params.get("destination") || "";
        const durationParam = params.get("duration") || "7 Nights";
        const roomsParam = parseInt(params.get("rooms") || "1", 10);
        const adultsParam = parseInt(params.get("adults") || "2", 10);
        const childrenParam = parseInt(params.get("children") || "0", 10);
        const infantsParam = parseInt(params.get("infants") || "0", 10);
        const dateParam = params.get("date") || "";
        const flexibleParam = params.get("flexible") === "true";
        const childAgesParam = params.get("childAges")?.split(",").map(Number) || [];

        if (departureParam === "ANY") {
            setIsAnyAirport(true);
            setSelectedRegions([]);
            setSelectedAirports([]);
        } else {
            setIsAnyAirport(false);
            setSelectedAirports(departureParam.split(","));
        }
        setDestination(destinationParam);
        setDuration(durationParam);
        setRooms(roomsParam);
        setAdults(adultsParam);
        setChildren(childrenParam);
        setInfants(infantsParam);
        setDepartureDate(dateParam);
        setIsFlexible(flexibleParam);
        setChildAges(childAgesParam);
    }, []);

    // Adjust childAges array when children count changes
    useEffect(() => {
        setChildAges((prevAges) => {
            const newAges = [...prevAges];
            while (newAges.length < children) newAges.push(2); // Default age
            while (newAges.length > children) newAges.pop();
            return newAges;
        });
    }, [children]);

    // Handle search submission
    const handleSearch = () => {
        if (!selectedDestination) {
            alert("Please select a destination from the suggestions.");
            return;
        }
        let departure;
        if (isAnyAirport) {
            departure = "ANY";
        } else {
            const regionCodes = selectedRegions.flatMap((regionName) =>
                regions.find((r) => r.name === regionName)?.codes ?? []
            );
            const allCodes = [...new Set([...regionCodes, ...selectedAirports])];
            departure = allCodes.join(",");
        }
        setIsLoading(true);
        const date = departureDate ? new Date(departureDate).toISOString().split("T")[0] : "";
        const searchParams = new URLSearchParams({
            departure,
            destination: selectedDestination.iataCode,
            duration,
            rooms: rooms.toString(),
            adults: adults.toString(),
            children: children.toString(),
            infants: infants.toString(),
            childAges: childAges.join(","),
            date,
            flexible: isFlexible.toString(),
        });
        router.push(`/search?${searchParams.toString()}`);
        setIsLoading(false);
    };

    // Display selected airports
    const getAirportDisplay = () => {
        if (isAnyAirport) return "Any Airport";
        const regionNames = selectedRegions;
        const airportNames = selectedAirports
            .map((code) => airports.find((a) => a.code === code)?.name)
            .filter(Boolean);
        return [...regionNames, ...airportNames].join(", ") || "Select Airports";
    };

    return (
        <div className="xl:container mx-auto py-6">
            {/* Tabs */}
            <div className="flex justify-start items-center space-x-4">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-t-xl font-medium transition duration-300 cursor-pointer ${
                            activeTab === tab
                                ? "bg-orange-500 text-white"
                                : "text-orange-600 hover:bg-orange-100"
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Form */}
            <div className={`flex flex-wrap md:grid rounded-b-xl gap-4 w-full bg-gray-100 px-4 py-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow ${
                activeTab === "Package Holiday" ? "rounded-tr-xl md:grid-cols-12" : "rounded-t-xl md:grid-cols-9" 
            }`}>
                {/* Departure Airport */}
                {activeTab === "Package Holiday" && (
                    <div className="relative w-full col-span-3">
                        <label className="ml-1 block text-sm font-medium text-white mb-2">Flying From</label>
                        <button
                            onClick={() => setShowAirportDropdown(!showAirportDropdown)}
                            className="w-full bg-white border border-gray-300 text-gray-700 rounded-xl px-4 py-3 text-left text-sm shadow-sm hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 flex justify-between items-center cursor-pointer truncate"
                        >
                            <span className="truncate">{getAirportDisplay()}</span>
                            <span className="ml-2 flex items-center underline">
                               LIST
                            </span>
                        </button>

                        {showAirportDropdown && (
                            <div className="absolute left-0 top-full mt-2 w-[90vw] max-w-[800px] bg-white rounded-xl border z-50 p-4">
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={isAnyAirport}
                                            onChange={() => {
                                                setIsAnyAirport(!isAnyAirport);
                                                if (!isAnyAirport) {
                                                    setSelectedRegions([]);
                                                    setSelectedAirports([]);
                                                }
                                            }}
                                            className="accent-orange-600 w-4 h-4"
                                        />
                                        <span className="ml-2 text-sm text-gray-400">Any Airport</span>
                                    </label>

                                    <hr className="my-2" />
                                    <div>
                                        <p className="font-semibold text-gray-700 mb-2">Regions</p>
                                        <div className="grid grid-cols-2 gap-2">
                                            {regions.map((region) => (
                                                <label key={region.name} className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedRegions.includes(region.name)}
                                                        onChange={() => {
                                                            if (selectedRegions.includes(region.name)) {
                                                                setSelectedRegions((prev) => prev.filter((r) => r !== region.name));
                                                                setSelectedAirports((prev) =>
                                                                    prev.filter((code) => !region.codes.includes(code))
                                                                );
                                                            } else {
                                                                setSelectedRegions((prev) => [...prev, region.name]);
                                                                setSelectedAirports((prev) => [
                                                                    ...new Set([...prev, ...region.codes]),
                                                                ]);
                                                            }
                                                            setIsAnyAirport(false);
                                                        }}
                                                        className="accent-orange-600 w-4 h-4"
                                                    />
                                                    <span className="ml-2 text-sm text-gray-700">{region.name}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-3">
                                        <p className="font-semibold text-gray-700 mb-2">Airports A-Z</p>
                                        <div className="grid grid-cols-2 gap-2">
                                            {airports.map((airport) => (
                                                <label key={airport.code} className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedAirports.includes(airport.code)}
                                                        onChange={() => {
                                                            setSelectedAirports((prev) => {
                                                                let newSelected = [];
                                                                if (prev.includes(airport.code)) {
                                                                    newSelected = prev.filter((code) => code !== airport.code);
                                                                } else {
                                                                    newSelected = [...prev, airport.code];
                                                                }
                                                                // If removing an airport that belongs to a region, we need to unselect that region if it no longer has all its airports selected
                                                                setSelectedRegions((prevRegions) => {
                                                                    return prevRegions.filter((rName) => {
                                                                        const r = regions.find((reg) => reg.name === rName);
                                                                        if (!r) return false;
                                                                        // Keep region selected only if all codes remain in newSelected
                                                                        return r.codes.every((c) => newSelected.includes(c));
                                                                    });
                                                                });
                                                                return newSelected;
                                                            });
                                                            setIsAnyAirport(false);
                                                        }}
                                                        className="accent-orange-600 w-4 h-4"
                                                    />
                                                    <span className="ml-2 text-sm text-gray-700">{airport.name}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        className="mt-4 w-full bg-orange-600 text-white py-2 rounded-xl hover:bg-orange-700 transition"
                                        onClick={() => setShowAirportDropdown(false)}
                                    >
                                        Done
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Destination */}
                <div className="relative col-span-3">
                    <label className="ml-1 block text-sm font-medium text-white mb-2">Destination</label>
                    <input
                        type="text"
                        placeholder="e.g., Mallorca, Spain"
                        className="w-full bg-white border border-gray-300 text-gray-700 rounded-xl px-4 py-3 text-left text-sm shadow-sm hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 flex justify-between items-center cursor-pointer truncate"
                        value={destination}
                        onChange={(e) => {
                            setDestination(e.target.value);
                            setSelectedDestination(null);
                            setShowDestinationDropdown(true);
                        }}
                    />
                    {showDestinationDropdown && destinationList.length > 0 && (
                        <div className="absolute w-full bg-white border rounded-lg mt-1 z-20 shadow-lg max-h-60 overflow-y-auto">
                            {destinationList.map((place) => (
                                <button
                                    key={place.iataCode}
                                    className="block w-full text-left px-3 py-2 hover:bg-orange-50"
                                    onClick={() => {
                                        setDestination(place.name);
                                        setSelectedDestination(place);
                                        setShowDestinationDropdown(false);
                                    }}
                                >
                                    {place.name} - {place.city}, {place.country}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Departure Date */}
                <div className="relative col-span-2">
                    <label className="ml-1 block text-sm font-medium text-white mb-2">Date</label>
                    <div className="relative">
                        <input
                            type="date"
                            className="w-full bg-white border border-gray-300 text-gray-700 rounded-xl px-4 py-3 text-left text-sm shadow-sm hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 flex justify-between items-center cursor-pointer truncate"
                            value={departureDate}
                            onChange={(e) => setDepartureDate(e.target.value)}
                            disabled={isFlexible}
                        />
                    </div>
                </div>

                {/* Duration */}
                <div className="relative col-span-1">
                    <label className="ml-1 block text-sm font-medium text-white mb-2">Nights</label>
                    <select
                        className="w-full bg-white border border-gray-300 text-gray-700 rounded-xl px-4 py-3 text-left text-sm shadow-sm hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 flex justify-between items-center cursor-pointer truncate"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                    >
                        {["3", "5", "7", "10", "14"].map((d) => (
                            <option key={d} value={d}>{d}</option>
                        ))}
                    </select>
                </div>

                {/* Rooms & Guests */}
                <div className="relative col-span-2">
                    <label className="ml-1 block text-sm font-medium text-white mb-2">Guests</label>
                    <button
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-left bg-white flex justify-between items-center focus:ring-2 focus:ring-orange-500 shadow-sm cursor-pointer"
                        onClick={() => setShowGuestsDropdown(!showGuestsDropdown)}
                    >
                        <span className="text-sm text-gray-700 truncate">
                          {rooms} Room{rooms > 1 ? "s" : ""}, {adults} Adult{adults > 1 ? "s" : ""}, {children} Child
                            {children !== 1 ? "ren" : ""}, {infants} Infant{infants !== 1 ? "s" : ""}
                        </span>
                        <span className="ml-2 flex items-center">
                                <svg
                                    className="fill-gray-400 w-5 h-5"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M15.5303 7.46967C15.8232 7.76256 15.8232 8.23744 15.5303 8.53033L10 14.0607L4.46967 8.53033C4.17678 8.23744 4.17678 7.76256 4.46967 7.46967C4.76256 7.17678 5.23744 7.17678 5.53033 7.46967L10 11.9393L14.4697 7.46967C14.7626 7.17678 15.2374 7.17678 15.5303 7.46967Z"
                                />
                              </svg>
                            </span>
                    </button>

                    {showGuestsDropdown && (
                        <div className="absolute mt-2 w-[200px] max-w-[90vw] bg-white border rounded-xl shadow-lg z-50 p-4 text-sm">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center gap-3">
                                    <label className="text-gray-700 font-medium mb-1">Rooms</label>
                                    <select
                                        className="bg-white border border-gray-300 text-gray-400 rounded-xl px-2 py-1 text-left text-sm shadow-sm hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 flex justify-between items-center cursor-pointer truncate"
                                        value={rooms}
                                        onChange={(e) => setRooms(Number(e.target.value))}
                                    >
                                        {[1, 2, 3, 4].map((r) => (
                                            <option key={r} value={r}>{r}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <div className="flex justify-between items-center gap-3">
                                        <label className="block text-gray-700 font-medium mb-1">Adults</label>
                                        <select
                                            className="bg-white border border-gray-300 text-gray-400 rounded-xl px-2 py-1 text-left text-sm shadow-sm hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 flex justify-between items-center cursor-pointer truncate"
                                            value={adults}
                                            onChange={(e) => setAdults(Number(e.target.value))}
                                        >
                                            {[1, 2, 3, 4, 5, 6].map((a) => (
                                                <option key={a} value={a}>{a}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex justify-between items-center gap-3">
                                        <label className="block text-gray-700 font-medium mb-1">Children (2-15)</label>
                                        <select
                                            className="bg-white border border-gray-300 text-gray-400 rounded-xl px-2 py-1 text-left text-sm shadow-sm hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 flex justify-between items-center cursor-pointer truncate"
                                            value={children}
                                            onChange={(e) => setChildren(Number(e.target.value))}
                                        >
                                            {[0, 1, 2, 3, 4].map((c) => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex justify-between items-center gap-3">
                                        <label className="block text-gray-700 font-medium mb-1">Infants (0-1)</label>
                                        <select
                                            className="bg-white border border-gray-300 text-gray-400 rounded-xl px-2 py-1 text-left text-sm shadow-sm hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 flex justify-between items-center cursor-pointer truncate"
                                            value={infants}
                                            onChange={(e) => setInfants(Number(e.target.value))}
                                        >
                                            {[0, 1, 2, 3, 4].map((i) => (
                                                <option key={i} value={i}>{i}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {children > 0 && (
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2">Children Ages (2-15)</label>
                                        <div className="flex flex-wrap gap-2">
                                            {childAges.map((age, index) => (
                                                <input
                                                    key={index}
                                                    type="number"
                                                    min="2"
                                                    max="15"
                                                    value={age}
                                                    onChange={(e) => {
                                                        const newAges = [...childAges];
                                                        newAges[index] = Number(e.target.value);
                                                        setChildAges(newAges);
                                                    }}
                                                    className="w-20 border border-gray-300 rounded-lg p-2"
                                                    placeholder={`Age ${index + 1}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <button
                                    className="w-full bg-orange-600 text-white py-2 rounded-xl hover:bg-orange-700 transition"
                                    onClick={() => setShowGuestsDropdown(false)}
                                >
                                    Done
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="relative col-span-1 flex items-end justify-center gap-3">
                    <button
                        onClick={handleSearch}
                        disabled={isLoading}
                        className={`w-full py-3 rounded-xl text-sm font-medium text-white shadow-sm transition duration-300 cursor-pointer ${
                            isLoading
                                ? "bg-orange-400 cursor-not-allowed"
                                : "bg-orange-400"
                        }`}
                    >
                        {isLoading ? "Searching..." : "Search"}
                    </button>
                </div>
            </div>
        </div>
    );
}