import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import db from '@/database/sequelize.js';
import { setAuthCookie, getCookie } from '@/utils/auth';

const { SendToken, User } = db;

export async function POST(req: Request) {
    try {
        const { optCode, email } = await req.json();

        const cookieStore = await cookies();
        const cookieValue = cookieStore.get('accountLocked');

        if (!cookieValue) {
            return NextResponse.json({ error: "Verification cookie not found" }, { status: 401 });
        }

        const data = JSON.parse(cookieValue.value);
        const key = data.key;
        const userId = data.userId;

        const user = await User.findOne({ where: { id: userId }, raw: true });

        if (!user || user.email !== email) {
            return NextResponse.json({ error: "User not found or email mismatch" });
        }

        const findToken = await SendToken.findOne({ where: { key } });

        if (!findToken) {
            return NextResponse.json({ error: "Invalid or expired verification key" });
        }

        if (findToken.token !== optCode) {
            return NextResponse.json({ error: "Invalid OTP code" });
        }

        if (findToken.expires && new Date(findToken.expires) < new Date()) {
            return NextResponse.json({ error: "OTP has expired", redirect: '/auth/login' });
        }

        await user.update({
            status: 'active'
        });

        await findToken.destroy();

        cookieStore.set('accountLocked', '', { expires: new Date(0), path: '/'});

        return NextResponse.json({ success: true, redirect: "/auth/login" });
    } catch (error) {
        console.error("Verification Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}