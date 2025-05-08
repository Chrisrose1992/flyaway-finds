import { NextResponse } from "next/server";
import db from "@/database/sequelize";
const {Booking} = db;

export async function POST(request) {
    const { offer, travelers, extras } = await request.json();

    try {
        // Save booking as pending
        const booking = await Booking.create({
            bookingType: "package",
            totalPrice: offer.offers?.[0]?.price?.total,
            travelers,
            offerData: offer,
            extras,
            status: "pending",
        });

        // TODO: Stripe payment logic here
        // TODO: Amadeus booking here

        booking.status = "confirmed";
        await booking.save();

        return NextResponse.json({ success: true, bookingReference: booking.id });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Booking failed." }, { status: 500 });
    }
}
