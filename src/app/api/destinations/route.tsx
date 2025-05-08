import { NextResponse } from "next/server";
import Amadeus from "amadeus";

const amadeus = new Amadeus({
    clientId: process.env.AMADEUS_API_KEY,
    clientSecret: process.env.AMADEUS_API_SECRET
});

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const query = searchParams.get("query");

        if (!query) {
            return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
        }

        const response = await amadeus.referenceData.locations.get({
            subType: "CITY,AIRPORT",
            keyword: query,
            page: { limit: 20 }
        });

        if (!response.data) {
            return NextResponse.json([]);
        }

        const formattedResults = response.data.map((place) => ({
            id: place.id,
            name: place.name,
            type: place.subType,
            iataCode: place.iataCode,
            city: place.address?.cityName || "",
            country: place.address?.countryName || "",
        }));

        return NextResponse.json(formattedResults);
    } catch (error) {
        console.error("Error fetching destinations:", error);
        return NextResponse.json({ error: "Failed to fetch destinations" }, { status: 500 });
    }
}
