import { NextResponse } from "next/server";
import db from '@/database/sequelize';
import { getAuthCookie } from '@/utils/auth';

const { UserActivity } = db;

export async function GET() {
    try {
        const authData = await getAuthCookie('authToken');

        if (!authData) {
            console.log("No valid auth cookie.");
            return NextResponse.json({ success: false, user: null });
        }

        const activityData = await UserActivity.findAll({
            where: {userId: authData},
            raw: true,
        });
        if (!activityData) return NextResponse.json({ success: false, activity: null });


        return NextResponse.json({ success: true, activityData });
    } catch (error) {
        console.error("GET /api/user/getActivity error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}