import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);

    const cookieName = searchParams.get("cookieName");

    if (!cookieName) {
        return NextResponse.json({ error: "Cookie name is required" }, { status: 400 });
    }

    // Retrieve the requested cookie
    const cookieStore = await cookies();
    const cookieValue = cookieStore.get(`${cookieName}`);

    if (!cookieValue) {
        return NextResponse.json({ error: "Cookie not found" }, { status: 404 });
    }

    return NextResponse.json({ [cookieName]: cookieValue.value }, { status: 200 });
}
