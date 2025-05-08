import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import db from '@/database/sequelize.js';

const { User, UserSettings, UserActivity, UserAddress } = db;

export async function GET(request) {
    try {
        const cookieStore = await cookies();
        const cookieValue = cookieStore.get('authToken')?.value;

        if (!cookieValue) return NextResponse.json({ success: false });

        let decodedToken;
        try {
            decodedToken = jwt.verify(cookieValue, process.env.JWT_SECRET);
        } catch (error) {
            return NextResponse.json({ success: false });
        }

        const user = await User.findOne({ where: { id: decodedToken.userId } });
        if (!user) return NextResponse.json({ success: false });

        console.log('cookie Value', cookieValue);
        console.log('decoded Token',decodedToken);
        console.log('User', user);

        return NextResponse.json({ success: true, data: 'bob' })
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}