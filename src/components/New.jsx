"use client"

import { useState } from 'react';

export default function SearchForm() {
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);
    const [rooms, setRooms] = useState(1);
    const [destination, setDestination] = useState("");
    const [departure, setDeparture] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [nights, setNights] = useState(7);
    const [selectedAirport, setSelectedAirport] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState({ nights: false, guests: false, airport: false });

    const airports = [
        "Any London", "London City", "London Heathrow", "London Southend",
        "London Gatwick", "London Luton", "London Stansted", "Aberdeen",
        "Bristol", "Cardiff", "East Midlands", "Belfast International",
        "Birmingham", "Edinburgh", "Exeter", "Glasgow", "Leeds Bradford",
        "Liverpool John Lennon", "Manchester", "Newcastle", "Norwich",
        "Southampton", "Teesside International"
    ];

    return (
        <div className="container mx-auto flex flex-col bg-white">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="flex flex-col relative">
                    <label className="text-slate-800 font-semibold text-xs">Departing Airport</label>
                    <button onClick={() => setDropdownOpen({ ...dropdownOpen, airport: !dropdownOpen.airport })} className="border border-gray-300 rounded-xl p-2 text-sm text-left w-full">
                        {selectedAirport ? selectedAirport : "Select Airport"}
                    </button>
                    {dropdownOpen.airport && (
                        <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-xl shadow-md z-10 max-h-60 overflow-y-auto">
                            {airports.map((airport, index) => (
                                <div key={index} className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => { setSelectedAirport(airport); setDropdownOpen({ ...dropdownOpen, airport: false }); }}>
                                    {airport}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="flex flex-col">
                    <label className="text-slate-800 font-semibold text-xs">Destination or Hotel</label>
                    <input
                        type="text"
                        className="border border-gray-300 rounded-xl p-2 text-sm"
                        placeholder="Enter destination"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-slate-800 font-semibold text-xs">Departure Date</label>
                    <input
                        type="date"
                        className="border border-gray-300 rounded-xl p-2 text-sm"
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                    />
                </div>
                <div className="flex flex-col relative">
                    <label className="text-slate-800 font-semibold text-xs">Nights</label>
                    <button onClick={() => setDropdownOpen({ ...dropdownOpen, nights: !dropdownOpen.nights })} className="border border-gray-300 rounded-xl p-2 text-sm text-left">
                        {nights} Nights
                    </button>
                    {dropdownOpen.nights && (
                        <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-xl shadow-md z-10">
                            {[...Array(15).keys()].map(n => (
                                <div key={n} className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => { setNights(n + 1); setDropdownOpen({ ...dropdownOpen, nights: false }); }}>
                                    {n + 1} Nights
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="flex flex-col relative">
                    <label className="text-slate-800 font-semibold text-xs">Guests</label>
                    <button onClick={() => setDropdownOpen({ ...dropdownOpen, guests: !dropdownOpen.guests })} className="border border-gray-300 rounded-xl p-2 text-sm text-left">
                        {adults} Adults, {children} Children, {infants} Infants, {rooms} Rooms
                    </button>
                    {dropdownOpen.guests && (
                        <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-xl shadow-md z-10 p-4 space-y-2">
                            <div>
                                <label className="text-slate-700 text-xs">Adults</label>
                                <select className="border border-gray-300 rounded-xl p-2 text-sm w-full" value={adults} onChange={(e) => setAdults(Number(e.target.value))}>
                                    {[...Array(6).keys()].map(n => <option key={n} value={n}>{n}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="text-slate-700 text-xs">Children</label>
                                <select className="border border-gray-300 rounded-xl p-2 text-sm w-full" value={children} onChange={(e) => setChildren(Number(e.target.value))}>
                                    {[...Array(6).keys()].map(n => <option key={n} value={n}>{n}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="text-slate-700 text-xs">Infants</label>
                                <select className="border border-gray-300 rounded-xl p-2 text-sm w-full" value={infants} onChange={(e) => setInfants(Number(e.target.value))}>
                                    {[...Array(6).keys()].map(n => <option key={n} value={n}>{n}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="text-slate-700 text-xs">Rooms</label>
                                <select className="border border-gray-300 rounded-xl p-2 text-sm w-full" value={rooms} onChange={(e) => setRooms(Number(e.target.value))}>
                                    {[...Array(6).keys()].map(n => <option key={n} value={n + 1}>{n + 1}</option>)}
                                </select>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <button className="bg-orange-600 text-white font-semibold py-2 px-6 rounded-full shadow-md w-fit mx-auto mt-4">Find</button>
        </div>
    );
}


