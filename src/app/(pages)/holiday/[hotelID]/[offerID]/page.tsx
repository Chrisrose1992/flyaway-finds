"use client";

import React, {use, useEffect, useState} from "react";

export default function HotelPage({ params, searchParams }) {
    const resolvedParams = use(params);
    const resolvedSearchParams = use(searchParams);

    const { hotelID } = resolvedParams;
    const {
        departure,
        destination,
        date,
        adults = "1",
        children = "0",
        nonStop,
        cabinClass,
        duration = "1",
        rooms = "1",
    } = resolvedSearchParams;

    const [hotelData, setHotelData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOutboundFlight, setSelectedOutboundFlight] = useState(null);
    const [selectedReturnFlight, setSelectedReturnFlight] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [selectedBoard, setSelectedBoard] = useState(null);

    useEffect(() => {
        if (!departure || !destination) {
            setError("Missing departure or destination");
            setLoading(false);
            return;
        }

        const queryParams = new URLSearchParams({
            hotelId: hotelID,
            departure,
            destination,
            date: date || new Date().toISOString().split("T")[0],
            adults,
            children,
            ...(nonStop && { nonStop }),
            ...(cabinClass && { cabinClass }),
            duration,
            rooms,
        });

        const fetchHolidayData = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/holiday?${queryParams.toString()}`);
                if (!res.ok) throw new Error(`Request failed: ${res.status}`);
                const data = await res.json();
                setHotelData(data);
                setSelectedOutboundFlight(data.package.flights.outbound);
                setSelectedReturnFlight(data.package.flights.return);
                setSelectedRoom(data.package.hotelOffer);
                setSelectedBoard(data.package.hotelOffer);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHolidayData();
    }, [hotelID, departure, destination, date, adults, children, nonStop, cabinClass, duration, rooms]);

    const handleBookNow = async () => {
        if (!hotelData) {
            console.error("No hotel data available");
            alert("No package data available. Please try again.");
            return;
        }

        const bookingData = {
            flights: {
                outbound: selectedOutboundFlight,
                return: selectedReturnFlight
            },
            room: selectedRoom,
            board: selectedBoard,
            totalPrice: (
                parseFloat(hotelData.package.basePrice.total) +
                (selectedOutboundFlight?.upgradePrice || 0) +
                (selectedReturnFlight?.upgradePrice || 0) +
                (selectedRoom?.upgradePrice || 0) +
                (selectedBoard?.upgradePrice || 0)
            ).toFixed(2),
            hotelId: hotelID,
            adults,
            children,
            departure,
            destination,
            date,
            duration,
            rooms,
        };

        console.log("Sending booking data:", bookingData);

        try {
            const res = await fetch("/api/save-booking-session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookingData),
            });

            const responseData = await res.json();
            console.log("Response from save-booking-session:", responseData);

            if (!res.ok) {
                throw new Error(responseData.details || "Failed to save booking session");
            }

            const { sessionId } = responseData;
            window.location.href = `/checkout?sessionId=${sessionId}`;
        } catch (error) {
            console.error("Error in handleBookNow:", error.message);
            alert(`Failed to proceed to checkout: ${error.message}`);
        }
    };

    if (loading) return <div className="flex items-center justify-center p-6">Loading...</div>;
    if (error) return <div className="p-6"><h1>Error</h1><p className="text-red-600">{error}</p></div>;
    if (!hotelData?.hotel) return <div className="p-6"><h1>No Data</h1><p>No hotel data found.</p></div>;

    const { hotel, package: pkg, upgrades } = hotelData;
    const totalPrice = parseFloat(pkg.basePrice.total) +
        (selectedOutboundFlight?.upgradePrice || 0) +
        (selectedReturnFlight?.upgradePrice || 0) +
        (selectedRoom?.upgradePrice || 0) +
        (selectedBoard?.upgradePrice || 0);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Holiday: {hotel.name}</h1>

            {/* Photos */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Hotel Photos</h2>
                {hotel.photos?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {hotel.photos.slice(0, 6).map((photo, idx) => (
                            <img key={idx} src={photo.url} alt="Hotel" className="w-full h-auto rounded-xl shadow" />
                        ))}
                    </div>
                ) : <p>No photos available.</p>}
            </div>

            {/* Package Details */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Your Package</h2>
                <div className="border p-4 rounded-xl shadow-md">
                    <p>Total Price: <span className="font-bold">£{totalPrice.toFixed(2)}</span></p>

                    {/* Outbound Flight Selection */}
                    <div className="mt-4">
                        <h3 className="font-semibold">Outbound Flight</h3>
                        <select
                            value={JSON.stringify(selectedOutboundFlight)}
                            onChange={e => setSelectedOutboundFlight(JSON.parse(e.target.value))}
                            className="w-full p-2 border rounded"
                        >
                            <option value={JSON.stringify(pkg.flights.outbound)}>Base Outbound Flight (£0)</option>
                            {upgrades.flights.outbound.map((f, idx) => (
                                <option key={idx} value={JSON.stringify(f)}>
                                    Upgrade {idx + 1} (+£{f.upgradePrice.toFixed(2)})
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Return Flight Selection */}
                    <div className="mt-4">
                        <h3 className="font-semibold">Return Flight</h3>
                        <select
                            value={JSON.stringify(selectedReturnFlight)}
                            onChange={e => setSelectedReturnFlight(JSON.parse(e.target.value))}
                            className="w-full p-2 border rounded"
                        >
                            <option value={JSON.stringify(pkg.flights.return)}>Base Return Flight (£0)</option>
                            {upgrades.flights.return.map((f, idx) => (
                                <option key={idx} value={JSON.stringify(f)}>
                                    Upgrade {idx + 1} (+£{f.upgradePrice.toFixed(2)})
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Room Selection */}
                    <div className="mt-4">
                        <h3 className="font-semibold">Room</h3>
                        <select
                            value={JSON.stringify(selectedRoom)}
                            onChange={e => setSelectedRoom(JSON.parse(e.target.value))}
                            className="w-full p-2 border rounded"
                        >
                            <option value={JSON.stringify(pkg.hotelOffer)}>Base Room (£0)</option>
                            {upgrades.rooms.map((r, idx) => (
                                <option key={idx} value={JSON.stringify(r)}>
                                    {r.room.description.text} (+£{r.upgradePrice.toFixed(2)})
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Board Selection */}
                    <div className="mt-4">
                        <h3 className="font-semibold">Board</h3>
                        <select
                            value={JSON.stringify(selectedBoard)}
                            onChange={e => setSelectedBoard(JSON.parse(e.target.value))}
                            className="w-full p-2 border rounded"
                        >
                            <option value={JSON.stringify(pkg.hotelOffer)}>
                                {pkg.hotelOffer.boardType || "Room Only"} (£0)
                            </option>
                            {upgrades.board.map((b, idx) => (
                                <option key={idx} value={JSON.stringify(b)}>
                                    {b.boardType} (+£{b.upgradePrice.toFixed(2)})
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Checkout Button */}
                    <div className="mt-6">
                        <button
                            onClick={handleBookNow}
                            className="block w-full bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition"
                        >
                            Book Now with Flyaway Finds
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}