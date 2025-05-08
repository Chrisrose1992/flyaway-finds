import { getAuthCookie } from '@/utils/auth';
import db from '@/database/sequelize';

const { UserSettings } = db;

export async function POST(req: Request) {
    try {
        const { emailNotifications, smsNotifications, emailMarketing } = await req.json();
        const userId = await getAuthCookie('authToken');

        if (!userId) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        const [updatedRows] = await UserSettings.update(
            { emailNotifications, smsNotifications, emailMarketing },
            { where: { userId: userId } }
        );

        if (updatedRows === 0) {
            return new Response(JSON.stringify({ error: "Notification Update failed. User not found?" }), { status: 404 });
        }

        return new Response(JSON.stringify({
            success: true,
            message: "Notification Setting updated successfully!",
        }), { status: 200 });
    } catch (error) {
        console.error("Update User Error:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}