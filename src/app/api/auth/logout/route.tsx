import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
    try {
        const cookieStore = await cookies();

        cookieStore.set('authToken', '', { expires: new Date(0), path: '/' });
        return NextResponse.json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}