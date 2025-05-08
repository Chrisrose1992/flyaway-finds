import {NextRequest, NextResponse} from "next/server";
import db from '@/database/sequelize';
import { getAuthCookie } from '@/utils/auth';

const { User } = db;

export async function GET(req: NextRequest) {
    try {
        const authData = await getAuthCookie('authToken');

        if (!authData) {
            console.log("No valid auth cookie.");
            return NextResponse.json({ success: false, user: null });
        }

        const user = await User.findOne({
            where: {id: authData},
            raw: true,
        });
        if (!user) return NextResponse.json({ success: false, user: null });

        const userData = {
            success: true,
            firstname: user.firstname || '',
            lastname: user.lastname || '',
            username: `${user.firstname} ${user.lastname}`,
            email: user.email,
            phoneNumber: user.phoneNumber|| '',
            dob: user.dob || '',
            title: user.title || '',
            role: user.role,
            gender: user.gender || '',
            status: user.status
        };

        return NextResponse.json({ userData });
    } catch (error) {
        console.error("GET /api/user/getUser error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}