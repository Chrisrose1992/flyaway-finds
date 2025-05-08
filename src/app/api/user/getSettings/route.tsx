import {NextRequest, NextResponse} from "next/server";
import db from '@/database/sequelize';
import { getAuthCookie } from '@/utils/auth';

const { UserSettings } = db;

export async function GET(req: NextRequest) {
    try {
        const authData = await getAuthCookie('authToken');

        if (!authData) {
            console.log("No valid auth cookie.");
            return NextResponse.json({ success: false, user: null });
        }

        const userSetting = await UserSettings.findOne({
            where: {userId: authData},
            raw: true,
        });
        if (!userSetting) return NextResponse.json({ success: false, setting: null });

        const settingData = {
            twoFactorEnabled: userSetting.twoFactorEnabled || false,
            emailNotifications: userSetting.emailNotifications || false,
            smsNotifications: userSetting.smsNotifications || false,
            emailVerified: userSetting.emailVerified || false,
            emailMarketing: userSetting.emailMarketing || false,
            preferredLanguage: userSetting.preferredLanguage || 'en',
            timeZone: userSetting.timeZone || 'UTC',
        };

        return NextResponse.json({ settingData });
    } catch (error) {
        console.error("GET /api/user/getUser error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}