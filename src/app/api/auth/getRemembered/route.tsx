import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const cookieStore = await cookies();
    const rememberedMe = cookieStore.get("rememberedMe");

    if (rememberedMe) {
        return NextResponse.json(JSON.parse(decodeURIComponent(rememberedMe.value)));
    }

    return NextResponse.json({ email: "" });
}
