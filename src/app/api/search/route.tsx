// @ts-ignore
import Amadeus from "amadeus";
import { NextResponse } from "next/server";
import axios from "axios";

// Initialize Amadeus client
const amadeus = new Amadeus({
    clientId: process.env.AMADEUS_API_KEY,
    clientSecret: process.env.AMADEUS_API_SECRET,
});

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

// Type definitions
interface FlightParams {
    originLocationCode: string;
    destinationLocationCode: string;
    departureDate: string;
    adults: number;
    children: number;
    currencyCode: string;
    max: number;
    travelClass?: string;
    nonStop?: boolean;
}

interface HotelPhoto {
    photo_reference: string;
    url: string;
}

interface PackageOffer {
    flights: {
        outbound: any; // Replace with detailed Flight type if needed
        return: any;
    };
    price: { total: string; currency: string };
    hotel: { [key: string]: any; details: HotelDetails };
    offer: { [key: string]: any };
    upgrades: { [key: string]: any; upgradePrice: number }[];
}

interface Pagination {
    currentPage: number;
    pageLimit: number;
    totalHotels: number;
    totalPages: number;
}

interface HotelDetails {
    name: string;
    rating: number;
    user_ratings_total: number;
    address: string;
    phone: string;
    website: string;
    photos: HotelPhoto[];
}

// Google Places API helpers
async function getPlaceId(hotelName: string, lat: number, lng: number): Promise<string | null> {
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
        hotelName
    )}&location=${lat},${lng}&radius=5&key=${GOOGLE_API_KEY}`;
    const res = await axios.get(url);
    return res.data.results[0]?.place_id || null;
}

async function getHotelDetails(placeId: string): Promise<HotelDetails | null> {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,formatted_address,formatted_phone_number,website,photos,geometry&key=${GOOGLE_API_KEY}`;
    const res = await axios.get(url);
    const result = res.data.result;

    if (!result) return null;
    return {
        name: result.name,
        rating: result.rating,
        user_ratings_total: result.user_ratings_total,
        address: result.formatted_address,
        phone: result.formatted_phone_number,
        website: result.website,
        photos: (result.photos || []).map((photo: any) => ({
            photo_reference: photo.photo_reference,
            url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photo.photo_reference}&key=${GOOGLE_API_KEY}`,
        })),
    };
}

export async function GET(request: Request) {
    try {
        const searchParams = new URL(request.url).searchParams;
        const departureParam = searchParams.get("departure"); // "LGW,LTN,SEN,STN,MAN"
        const destinationParam = searchParams.get("destination"); // "NYC"
        const dateParam = searchParams.get("date") || new Date().toISOString().split("T")[0];

        const departures = departureParam ? departureParam.split(",").map(code => code.trim()) : [];
        const destinations = destinationParam ? destinationParam.split(",").map(code => code.trim()) : [];

        if (!departures.length || !destinations.length) {
            return NextResponse.json({ error: "Missing departure or destination" }, { status: 400 });
        }

        const adults = parseInt(searchParams.get("adults") || "1", 10);
        const children = parseInt(searchParams.get("children") || "0", 10);
        const flightNonStop = searchParams.get("nonStop") === "true";
        const flightCabinClass = searchParams.get("cabinClass");
        const page = parseInt(searchParams.get("page") || "1", 10);
        const pageLimit = parseInt(searchParams.get("limit") || "20", 10);
        const duration = parseInt(searchParams.get("duration")?.replace(/\D+/g, "") || "1", 10);

        const checkInDate = new Date(dateParam).toISOString().split("T")[0];
        const checkOutDate = new Date(new Date(dateParam).setDate(new Date(dateParam).getDate() + duration))
            .toISOString()
            .split("T")[0];

        const marginPercentage = parseFloat(process.env.MARGIN_RATE || "10");
        const eurToGbpRate = parseFloat(process.env.EUR_TO_GBP_RATE || "0.85");

        const allOffers: PackageOffer[] = [];

        // Loop through each departure-destination combination
        for (const departure of departures) {
            for (const destination of destinations) {
                // Flight parameters
                const outboundFlightParams: FlightParams = {
                    originLocationCode: departure,
                    destinationLocationCode: destination,
                    departureDate: checkInDate,
                    adults,
                    children,
                    currencyCode: "GBP",
                    max: 5,
                    ...(flightCabinClass && { travelClass: flightCabinClass }),
                    ...(flightNonStop && { nonStop: true }),
                };

                const returnFlightParams: FlightParams = {
                    originLocationCode: destination,
                    destinationLocationCode: departure,
                    departureDate: checkOutDate,
                    adults,
                    children,
                    currencyCode: "GBP",
                    max: 5,
                    ...(flightCabinClass && { travelClass: flightCabinClass }),
                    ...(flightNonStop && { nonStop: true }),
                };

                // Fetch flights
                const [outboundFlightResponse, returnFlightResponse] = await Promise.all([
                    amadeus.shopping.flightOffersSearch.get(outboundFlightParams),
                    amadeus.shopping.flightOffersSearch.get(returnFlightParams),
                ]);

                const cheapestOutboundFlight = outboundFlightResponse.data?.[0];
                const cheapestReturnFlight = returnFlightResponse.data?.[0];

                if (!cheapestOutboundFlight || !cheapestReturnFlight) {
                    console.warn(`No flights found for ${departure} to ${destination}`);
                    continue; // Skip this combination
                }

                // Fetch hotels
                const hotelSearchResponse = await amadeus.referenceData.locations.hotels.byCity.get({
                    cityCode: destination,
                });

                const hotelIds = hotelSearchResponse.data
                    ?.slice((page - 1) * pageLimit, page * pageLimit)
                    .map((hotel: any) => hotel.hotelId) || [];

                if (!hotelIds.length) {
                    console.warn(`No hotels found for ${destination}`);
                    continue;
                }

                const hotelOffersResponse = await amadeus.shopping.hotelOffersSearch.get({
                    hotelIds: hotelIds.join(","),
                    checkInDate,
                    checkOutDate,
                    countryOfResidence: "GB",
                    adults,
                    roomQuantity: parseInt(searchParams.get("rooms") || "1", 10),
                    currency: "GBP",
                    bestRateOnly: true,
                    view: "full",
                });

                const hotelData = hotelOffersResponse.data || [];

                // Calculate flight prices
                let outboundFlightPriceGBP = parseFloat(cheapestOutboundFlight?.price?.grandTotal || "0");
                if (cheapestOutboundFlight?.price?.currency === "EUR") outboundFlightPriceGBP *= eurToGbpRate;

                let returnFlightPriceGBP = parseFloat(cheapestReturnFlight?.price?.grandTotal || "0");
                if (cheapestReturnFlight?.price?.currency === "EUR") returnFlightPriceGBP *= eurToGbpRate;

                // Combine offers
                const combinedOffers = await Promise.all(
                    hotelData.map(async (item: any) => {
                        let hotelPrice = parseFloat(item.offers?.[0]?.price?.total || "0");
                        if (item.offers?.[0]?.price?.currency === "EUR") hotelPrice *= eurToGbpRate;

                        const totalFlightPrice = outboundFlightPriceGBP + returnFlightPriceGBP;
                        const packagePrice = (totalFlightPrice + hotelPrice) * (1 + marginPercentage / 100);

                        const outboundFlight = { ...cheapestOutboundFlight };
                        const returnFlight = { ...cheapestReturnFlight };

                        [outboundFlight, returnFlight].forEach((flight) => {
                            delete flight?.price;
                            delete flight?.pricingOptions;
                            delete flight?.travelerPricings;
                            delete flight?.type;
                            delete flight?.source;
                        });

                        const lat = item.hotel.latitude;
                        const lng = item.hotel.longitude;
                        const hotelName = item.hotel.name;

                        let details: HotelDetails | null = null;
                        const placeId = await getPlaceId(hotelName, lat, lng);
                        if (placeId) {
                            details = await getHotelDetails(placeId);
                        }

                        return {
                            flights: { outbound: outboundFlight, return: returnFlight },
                            price: { total: packagePrice.toFixed(2), currency: "GBP" },
                            hotel: { ...item.hotel, details },
                            offer: item.offers?.[0] || {},
                            upgrades:
                                item.offers?.slice(1).map((offer: any) => ({
                                    ...offer,
                                    upgradePrice: parseFloat(offer.price?.total || "0") * (marginPercentage / 100) - hotelPrice,
                                })) || [],
                        };
                    })
                );

                allOffers.push(...combinedOffers);
            }
        }

        const totalHotels = allOffers.length; // Simplified; adjust if tracking per destination
        const totalPages = Math.ceil(totalHotels / pageLimit);

        return NextResponse.json({
            offers: allOffers.slice((page - 1) * pageLimit, page * pageLimit),
            pagination: { currentPage: page, pageLimit, totalHotels, totalPages },
        });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Failed to fetch data from APIs" }, { status: 500 });
    }
}