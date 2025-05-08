import Amadeus from "amadeus";
import { NextResponse } from "next/server";
import dotenv from "dotenv";

dotenv.config();

const amadeus = new Amadeus({
    clientId: process.env.AMADEUS_API_KEY,
    clientSecret: process.env.AMADEUS_API_SECRET,
});

export async function POST(request) {
    try {
        const { sessionId } = await request.json();

        const sessionRes = await fetch(`${request.nextUrl.origin}/api/save-booking-session?sessionId=${sessionId}`);
        if (!sessionRes.ok) throw new Error("Failed to fetch session data");
        const bookingData = await sessionRes.json();

        const { flights, board, travelers } = bookingData;

        // Hotel booking payload
        const hotelBookingPayload = {
            data: {
                type: "hotel-order",
                guests: travelers.map(t => ({
                    tid: t.tid,
                    title: t.title,
                    firstName: t.firstName,
                    lastName: t.lastName,
                    phone: t.phone,
                    email: t.email,
                })),
                travelAgent: {
                    contact: { email: travelers[0].email }
                },
                roomAssociations: [
                    {
                        guestReferences: travelers.map(t => ({ guestReference: t.tid.toString() })),
                        hotelOfferId: board.id
                    }
                ],
                payment: {
                    method: "CREDIT_CARD",
                    paymentCard: {
                        paymentCardInfo: {
                            vendorCode: "VI", // Placeholder; replace with real data if needed
                            cardNumber: "4151289722471370",
                            expiryDate: "2026-08",
                            holderName: `${travelers[0].firstName} ${travelers[0].lastName}`
                        }
                    }
                }
            }
        };

        // Flight booking payload
        const flightBookingPayload = {
            data: {
                type: "flight-order",
                flightOffers: [flights.outbound, flights.return],
                travelers: travelers.map(t => ({
                    id: t.tid.toString(),
                    dateOfBirth: t.dateOfBirth,
                    name: { firstName: t.firstName, lastName: t.lastName },
                    gender: t.title === "MR" ? "MALE" : "FEMALE",
                    contact: {
                        emailAddress: t.email,
                        phones: [{ deviceType: "MOBILE", countryCallingCode: "44", number: t.phone.replace(/\D/g, "") }]
                    },
                    documents: [
                        {
                            documentType: "PASSPORT",
                            number: t.passportNumber,
                            expiryDate: t.expiryDate,
                            issuanceCountry: t.nationality,
                            nationality: t.nationality,
                            holder: t.tid === 1
                        }
                    ]
                })),
                remarks: { general: [{ subType: "GENERAL_MISCELLANEOUS", text: "BOOKING FROM FLYAWAY FINDS" }] },
                ticketingAgreement: { option: "DELAY_TO_CANCEL", delay: "6D" },
                contacts: [
                    {
                        addresseeName: { firstName: "Flyaway", lastName: "Finds" },
                        companyName: "FLYAWAY FINDS",
                        purpose: "STANDARD",
                        emailAddress: "support@flyawayfinds.com",
                        address: { lines: ["123 Travel Lane"], postalCode: "SW1A 1AA", cityName: "London", countryCode: "GB" }
                    }
                ]
            }
        };

        // Book hotel and flight with Amadeus
        const [hotelBookingResponse, flightBookingResponse] = await Promise.all([
            amadeus.booking.hotelOrders.post(JSON.stringify(hotelBookingPayload)),
            amadeus.booking.flightOrders.post(JSON.stringify(flightBookingPayload))
        ]);

        return NextResponse.json({
            hotelBooking: hotelBookingResponse.data,
            flightBooking: flightBookingResponse.data,
        });
    } catch (error) {
        console.error("Booking Error:", error);
        return NextResponse.json({ error: "Failed to book holiday", details: error.message }, { status: 500 });
    }
}