'use client';
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import Image from "next/image";
import { CalendarDays, Plane, Users } from "lucide-react";

const dummyBookings = [
    {
        id: "26843463",
        hotel: "TUI BLUE Orquidea",
        location: "Bahia Feliz, Gran Canaria, ES",
        date: "Fri 08 Aug 2025",
        duration: "14 nights",
        route: "Manchester - Gran Canaria",
        guests: "2 adults, 2 children",
        image: "https://gotrip-appdir.vercel.app/img/destinations/3/1.png",
        type: "upcoming",
    },
    {
        id: "23562571",
        hotel: "TUI BLUE Orquidea",
        location: "Bahia Feliz, Gran Canaria, ES",
        date: "Sat 11 May 2024",
        duration: "7 nights",
        route: "Manchester - Gran Canaria",
        guests: "2 adults, 2 children",
        image: "https://gotrip-appdir.vercel.app/img/destinations/3/4.png",
        type: "past",
    },
];

export default function ManageMyBookingPage() {
    const { user } = useAuth();
    const [modalBookingId, setModalBookingId] = useState<string | null>(null);

    const renderBookingCard = (booking: any) => (
        <div
            key={booking.id}
            className="flex flex-col md:flex-row items-start md:items-center justify-between border rounded-xl p-4 bg-white shadow transition hover:shadow-lg"
        >
            <div className="flex gap-4 w-full">
                <img
                    src={booking.image}
                    alt="Hotel"
                    className="rounded-lg object-cover w-32 h-24"
                />
                <div className="flex-1">
                    <h3 className="font-bold text-slate-800">{booking.hotel}</h3>
                    <p className="text-sm text-slate-500 mb-2">{booking.location}</p>
                    <div className="text-sm text-slate-600 flex flex-col gap-1">
            <span className="flex items-center gap-2">
              <CalendarDays size={16} /> {booking.date} • {booking.duration}
            </span>
                        <span className="flex items-center gap-2">
              <Plane size={16} /> {booking.route}
            </span>
                        <span className="flex items-center gap-2">
              <Users size={16} /> {booking.guests}
            </span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:items-end mt-4 md:mt-0">
                <button
                    onClick={() => setModalBookingId(booking.id)}
                    className={`${
                        booking.type === "upcoming"
                            ? "bg-orange-600 hover:bg-orange-700"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    } px-4 py-2 rounded-md text-sm font-medium`}
                >
                    {booking.type === "upcoming" ? "Manage Booking" : "View Booking"}
                </button>
                <p className="text-xs text-slate-400 mt-1">Booking ref: {booking.id}</p>
            </div>
        </div>
    );

    return (
        <div>
            {/* Hero banner */}
            <div className="relative h-[350px] w-full overflow-hidden">
                <Image
                    src="/images/happy-family.jpg"
                    alt="Manage Booking Hero"
                    fill
                    className="object-cover z-0"
                    priority
                />
                <div className="absolute inset-0 bg-black/40 z-10" />
                <div className="relative z-20 h-full flex items-center justify-center">
                    <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-md max-w-lg w-full">
                        <h1 className="text-3xl font-extrabold text-slate-800 mb-2">
                            Manage My Booking
                        </h1>
                        <p className="text-slate-600 text-sm mb-6">
                            View, edit or retrieve your holiday with your booking reference and details.
                        </p>

                        <form className="space-y-3">
                            <input
                                type="date"
                                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm"
                                placeholder="Departure Date"
                            />
                            <input
                                type="text"
                                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm"
                                placeholder="Booking Reference"
                            />
                            <input
                                type="text"
                                className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm"
                                placeholder="Lead Passenger Surname"
                            />
                            <button
                                type="submit"
                                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg font-medium text-sm"
                            >
                                Retrieve Booking
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Bookings Section */}
            {user && (
                <div className="container mx-auto px-4 py-10">
                    <div className="space-y-6 mb-12">
                        <h2 className="text-xl font-bold text-slate-700">Upcoming bookings</h2>
                        {dummyBookings.filter((b) => b.type === "upcoming").map(renderBookingCard)}
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-slate-700">Past bookings</h2>
                        {dummyBookings.filter((b) => b.type === "past").map(renderBookingCard)}
                    </div>
                </div>
            )}

            {/* Modal placeholder */}
            {modalBookingId && (
                <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
                    <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg relative">
                        <h3 className="text-lg font-semibold mb-2 text-slate-800">
                            Manage Booking #{modalBookingId}
                        </h3>
                        <p className="text-sm text-slate-600">Feature coming soon...</p>
                        <button
                            onClick={() => setModalBookingId(null)}
                            className="absolute top-2 right-3 text-slate-400 hover:text-slate-600"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
