import { NextResponse } from "next/server";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET);

export async function POST(request) {
    try {
        const { amount } = await request.json();

        const paymentIntent = await stripe.paymentIntents.create({
            amount, // Amount in pence
            currency: "gbp",
            payment_method_types: ["card"],
            confirmation_method: "automatic", // Default, supports 3DS
            // Optional: Add metadata or description if needed
            description: "Holiday Booking with Flyaway Finds",
        });

        return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error("Stripe Error:", error);
        return NextResponse.json({ error: "Failed to create payment intent", details: error.message }, { status: 500 });
    }
}