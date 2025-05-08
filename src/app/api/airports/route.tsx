import { NextResponse } from "next/server";
import Amadeus from "amadeus";
import dotenv from "dotenv";

dotenv.config();

const amadeus = new Amadeus({
    clientId: process.env.AMADEUS_API_KEY,
    clientSecret: process.env.AMADEUS_API_SECRET
});

export async function GET() {
    try {
        const response = await amadeus.referenceData.locations.get({
            subType: "AIRPORT",
            countryCode: "GB",
            keyword: "airport",
            page: { limit: 300 }
        });

        if (!Array.isArray(response.data)) {
            console.error("Unexpected API response:", response.data);
            return NextResponse.json([]);
        }

        const filteredAirports = response.data
            .filter(airport => !airport.name.toUpperCase().includes("RAF"))
            .map(airport => ({
                iataCode: airport.iataCode,
                name: airport.name === "AIRPORT"
                    ? `${airport.address.cityName}`
                    : airport.name === "CITY AIRPORT"
                        ? `${airport.address.cityName}`
                        : airport.name,
                city: airport.address.cityName,
                country: airport.address.countryName,
            }))
            .sort((a, b) => a.name.localeCompare(b.name));

        return NextResponse.json(filteredAirports);
    } catch (error) {
        console.error("Error fetching airports:", error);
        return NextResponse.json({ error: "Failed to fetch airports" }, { status: 500 });
    }
}
