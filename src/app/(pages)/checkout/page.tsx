"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface Traveler {
    tid: number;
    title: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    dateOfBirth: string;
    nationality: string;
    passportNumber: string;
    expiryDate: string;
}

interface BookingData {
    totalPrice: number;
    adults: string;
    children: string;
    [key: string]: any;
}

export default function CheckoutPage() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("sessionId");

    const [bookingData, setBookingData] = useState<BookingData | null>(null);
    const [travelers, setTravelers] = useState<Traveler[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBookingData = async () => {
            if (!sessionId) {
                setError("No session ID provided");
                setLoading(false);
                return;
            }

            try {
                const res = await fetch(`/api/save-booking-session?sessionId=${sessionId}`);
                if (!res.ok) throw new Error(`Failed to fetch session data: ${res.status}`);
                const data = await res.json();

                if (data.error) {
                    throw new Error(data.error);
                }

                setBookingData(data);

                const adults = parseInt(data.adults, 10) || 0;
                const children = parseInt(data.children, 10) || 0;
                const totalTravelers = adults + children;

                if (totalTravelers <= 0) {
                    throw new Error("Invalid number of travelers");
                }

                setTravelers(
                    Array(totalTravelers).fill().map((_, idx) => ({
                        tid: idx + 1,
                        title: "",
                        firstName: "",
                        lastName: "",
                        phone: "",
                        email: "",
                        dateOfBirth: "",
                        nationality: "",
                        passportNumber: "",
                        expiryDate: "",
                    }))
                );
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookingData();
    }, [sessionId]);

    const handleTravelerChange = (index, field, value) => {
        const updatedTravelers = [...travelers];
        updatedTravelers[index][field] = value;
        setTravelers(updatedTravelers);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!bookingData) return;

        // Store traveler info in the session
        const updatedBookingData = {
            ...bookingData,
            travelers,
        };

        try {
            const res = await fetch("/api/save-booking-session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedBookingData),
            });

            if (!res.ok) throw new Error("Failed to update session with traveler info");

            const { sessionId: updatedSessionId } = await res.json();
            window.location.href = `/checkout/pay?sessionId=${updatedSessionId}`;
        } catch (error) {
            console.error("Error saving traveler info:", error);
            alert("Failed to proceed to payment. Please try again.");
        }
    };

    if (loading) return <div className="p-6">Loading...</div>;
    if (error) return <div className="p-6"><h1>Error</h1><p className="text-red-600">{error}</p></div>;
    if (!bookingData) return <div className="p-6"><h1>No Data</h1><p>No booking data available.</p></div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Checkout - Flyaway Finds</h1>
            <p>Total Price: £{bookingData.totalPrice}</p>
            <form onSubmit={handleSubmit} className="space-y-6">
                {travelers.map((traveler, index) => (
                    <div key={index} className="border p-4 rounded">
                        <h2 className="font-semibold">Traveler {index + 1}</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Title (MR/MRS)"
                                value={traveler.title}
                                onChange={e => handleTravelerChange(index, "title", e.target.value)}
                                className="p-2 border rounded"
                                required
                            />
                            <input
                                type="text"
                                placeholder="First Name"
                                value={traveler.firstName}
                                onChange={e => handleTravelerChange(index, "firstName", e.target.value)}
                                className="p-2 border rounded"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={traveler.lastName}
                                onChange={e => handleTravelerChange(index, "lastName", e.target.value)}
                                className="p-2 border rounded"
                                required
                            />
                            <input
                                type="tel"
                                placeholder="Phone"
                                value={traveler.phone}
                                onChange={e => handleTravelerChange(index, "phone", e.target.value)}
                                className="p-2 border rounded"
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={traveler.email}
                                onChange={e => handleTravelerChange(index, "email", e.target.value)}
                                className="p-2 border rounded"
                                required
                            />
                            <input
                                type="date"
                                placeholder="Date of Birth"
                                value={traveler.dateOfBirth}
                                onChange={e => handleTravelerChange(index, "dateOfBirth", e.target.value)}
                                className="p-2 border rounded"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Nationality"
                                value={traveler.nationality}
                                onChange={e => handleTravelerChange(index, "nationality", e.target.value)}
                                className="p-2 border rounded"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Passport Number"
                                value={traveler.passportNumber}
                                onChange={e => handleTravelerChange(index, "passportNumber", e.target.value)}
                                className="p-2 border rounded"
                                required
                            />
                            <input
                                type="date"
                                placeholder="Passport Expiry"
                                value={traveler.expiryDate}
                                onChange={e => handleTravelerChange(index, "expiryDate", e.target.value)}
                                className="p-2 border rounded"
                                required
                            />
                        </div>
                    </div>
                ))}
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Proceed to Payment
                </button>
            </form>
        </div>
    );
}