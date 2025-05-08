import {NextResponse} from "next/server";
import db from '@/database/sequelize';
import { getAuthCookie } from '@/utils/auth';

const { Passenger } = db;

export async function GET() {
    try {
        const authData = await getAuthCookie('authToken');

        if (!authData) {
            console.log("No valid auth cookie.");
            return NextResponse.json({ success: false, user: null });
        }

        const passangerData = await Passenger.findAll({
            where: { userId: authData },
            raw: true,
        });
        if (!passangerData) return NextResponse.json({ success: false, activity: null });

        return NextResponse.json({ success:true, passangerData });
    } catch (error) {
        console.error("GET /api/user/getFriends&Family error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}