import {NextRequest, NextResponse} from "next/server";
import db from '@/database/sequelize';
import {getAuthCookie, getCookie} from "@/utils/auth";
import {use} from "react";

const { UserAddress } = db;

export async function GET(req: NextRequest) {
    try {
        const authData = await getAuthCookie('authToken');

        if (!authData) {
            console.log("No valid auth cookie.");
            return NextResponse.json({ success: false, user: null });
        }

        const userAddress = await UserAddress.findOne({
            where: {userId: authData},
            raw: true,
        });
        if (!userAddress) return NextResponse.json({ success: false, address: null });


        const addressData = {
            success: true,
            name: userAddress?.name,
            address1: userAddress?.address1,
            address2: userAddress?.address2,
            city: userAddress?.city,
            zip: userAddress?.zip,
            country: userAddress?.country,
        };

        return NextResponse.json({ addressData });
    } catch (error) {
        console.error("GET /api/user/getAddress error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}