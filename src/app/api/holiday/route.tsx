import Amadeus from "amadeus";
import { NextResponse } from "next/server";
import axios from "axios";

const amadeus = new Amadeus({
    clientId: process.env.AMADEUS_API_KEY,
    clientSecret: process.env.AMADEUS_API_SECRET,
});

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

async function getPlaceId(hotelName, lat, lng) {
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(hotelName)}&location=${lat},${lng}&radius=5&key=${GOOGLE_API_KEY}`;
    const res = await axios.get(url);
    return res.data.results[0]?.place_id || null;
}

async function getPlacePhotos(placeId) {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${GOOGLE_API_KEY}`;
    const res = await axios.get(url);
    return res.data.result.photos?.map(photo => ({
        photo_reference: photo.photo_reference,
        url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photo.photo_reference}&key=${GOOGLE_API_KEY}`
    })) || [];
}

export async function GET(request) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const hotelId = searchParams.get("hotelId");
        const departure = searchParams.get("departure");
        const destination = searchParams.get("destination");
        const dateParam = searchParams.get("date") || new Date().toISOString().split("T")[0];

        if (!hotelId || !departure || !destination) {
            return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
        }

        const adults = parseInt(searchParams.get("adults") || "1", 10);
        const children = parseInt(searchParams.get("children") || "0", 10);
        const flightNonStop = searchParams.get("nonStop") === "true";
        const flightCabinClass = searchParams.get("cabinClass") || null;
        const duration = searchParams.get("duration")?.replace(/\D+/g, "") || "1";

        const checkInDate = new Date(dateParam).toISOString().split("T")[0];
        const checkOutDate = new Date(new Date(dateParam).setDate(new Date(dateParam).getDate() + parseInt(duration))).toISOString().split("T")[0];

        // Outbound flight parameters
        const outboundFlightParams = {
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

        // Return flight parameters
        const returnFlightParams = {
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

        // Fetch both outbound and return flights
        const [outboundFlightResponse, returnFlightResponse] = await Promise.all([
            amadeus.shopping.flightOffersSearch.get(outboundFlightParams),
            amadeus.shopping.flightOffersSearch.get(returnFlightParams)
        ]);

        const outboundFlightOffers = outboundFlightResponse.data || [];
        const returnFlightOffers = returnFlightResponse.data || [];

        const cheapestOutboundFlight = outboundFlightOffers[0];
        const cheapestReturnFlight = returnFlightOffers[0];
        const outboundFlightUpgrades = outboundFlightOffers.slice(1);
        const returnFlightUpgrades = returnFlightOffers.slice(1);

        if (!cheapestOutboundFlight || !cheapestReturnFlight) {
            return NextResponse.json({ error: "No flights available for the selected dates" }, { status: 404 });
        }

        const hotelOffersResponse = await amadeus.shopping.hotelOffersSearch.get({
            hotelIds: hotelId,
            checkInDate,
            checkOutDate,
            countryOfResidence: "GB",
            adults,
            roomQuantity: parseInt(searchParams.get("rooms") || "1", 10),
            currency: "GBP",
            bestRateOnly: false,
            view: "FULL"
        }).catch(() => ({ data: [] }));

        const hotelData = hotelOffersResponse.data[0];
        if (!hotelData) {
            return NextResponse.json({ error: "No hotel offers found" }, { status: 404 });
        }

        const marginPercentage = parseFloat(process.env.MARGIN_RATE || "10");
        const eurToGbpRate = parseFloat(process.env.EUR_TO_GBP_RATE || "0.85");

        let outboundFlightPrice = parseFloat(cheapestOutboundFlight?.price?.grandTotal || "0");
        if (cheapestOutboundFlight?.price?.currency === "EUR") outboundFlightPrice *= eurToGbpRate;

        let returnFlightPrice = parseFloat(cheapestReturnFlight?.price?.grandTotal || "0");
        if (cheapestReturnFlight?.price?.currency === "EUR") returnFlightPrice *= eurToGbpRate;

        const baseOffer = hotelData.offers[0];
        let baseHotelPrice = parseFloat(baseOffer.price?.total || "0");
        if (baseOffer.price?.currency === "EUR") baseHotelPrice *= eurToGbpRate;

        const totalFlightPrice = outboundFlightPrice + returnFlightPrice;
        const basePrice = (totalFlightPrice + baseHotelPrice) * (1 + marginPercentage / 100);

        const roomUpgrades = [];
        const boardUpgrades = [];
        hotelData.offers.slice(1).forEach(offer => {
            let offerPrice = parseFloat(offer.price?.total || "0");
            if (offer.price?.currency === "EUR") offerPrice *= eurToGbpRate;
            const upgradePrice = offerPrice - baseHotelPrice;

            if (offer.room?.description?.text !== baseOffer.room?.description?.text) {
                roomUpgrades.push({ ...offer, upgradePrice });
            }
            if (offer.boardType !== baseOffer.boardType) {
                boardUpgrades.push({ ...offer, upgradePrice });
            }
        });

        let photos = [];
        const placeId = await getPlaceId(hotelData.hotel.name, hotelData.hotel.latitude, hotelData.hotel.longitude);
        if (placeId) photos = await getPlacePhotos(placeId);

        return NextResponse.json({
            hotel: { ...hotelData.hotel, photos },
            package: {
                basePrice: {
                    total: basePrice.toFixed(2),
                    currency: "GBP"
                },
                flights: {
                    outbound: cheapestOutboundFlight,
                    return: cheapestReturnFlight
                },
                hotelOffer: baseOffer
            },
            upgrades: {
                flights: {
                    outbound: outboundFlightUpgrades.map(f => ({
                        ...f,
                        upgradePrice: (parseFloat(f.price.grandTotal) - outboundFlightPrice) * (1 + marginPercentage / 100)
                    })),
                    return: returnFlightUpgrades.map(f => ({
                        ...f,
                        upgradePrice: (parseFloat(f.price.grandTotal) - returnFlightPrice) * (1 + marginPercentage / 100)
                    }))
                },
                rooms: roomUpgrades,
                board: boardUpgrades
            }
        });
    } catch (error) {
        console.error("Amadeus API Error:", error);
        return NextResponse.json({ error: "Failed to fetch holiday details" }, { status: 500 });
    }
}