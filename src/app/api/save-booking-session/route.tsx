import { NextResponse } from "next/server";

// In-memory store (replace with database/Redis in production)
const bookingSessions = new Map();

export async function POST(request) {
    try {
        const body = await request.json();
        console.log("Received booking data:", body); // Log incoming data

        const { flights, room, board, totalPrice, hotelId, adults, children, departure, destination, date, duration, rooms } = body;

        // Validate required fields
        if (!flights || !flights.outbound || !flights.return || !room || !board || !totalPrice || !hotelId) {
            console.error("Missing required fields:", { flights, room, board, totalPrice, hotelId });
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const sessionId = Date.now().toString() + Math.random().toString(36).substring(2, 15);
        bookingSessions.set(sessionId, {
            flights, // Store the entire flights object with outbound and return
            room,
            board,
            totalPrice,
            hotelId,
            adults,
            children,
            departure,
            destination,
            date,
            duration,
            rooms,
        });

        console.log("Session saved with ID:", sessionId); // Confirm save
        setTimeout(() => bookingSessions.delete(sessionId), 30 * 60 * 1000); // 30 minutes timeout

        return NextResponse.json({ sessionId });
    } catch (error) {
        console.error("Error in save-booking-session:", error.message, error.stack);
        return NextResponse.json({ error: "Failed to save booking session", details: error.message }, { status: 500 });
    }
}

export async function GET(request) {
    const sessionId = request.nextUrl.searchParams.get("sessionId");
    const sessionData = bookingSessions.get(sessionId);

    if (!sessionData) {
        return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    return NextResponse.json(sessionData);
}