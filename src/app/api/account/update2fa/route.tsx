import { getAuthCookie } from '@/utils/auth';
import db from '@/database/sequelize';

const { UserSettings } = db;

export async function POST(req: Request) {
    try {
        const { twoFactorEnabled } = await req.json();
        const userId = await getAuthCookie('authToken');

        if (!userId) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        const [updatedRows] = await UserSettings.update(
            { twoFactorEnabled },
            { where: { userId: userId } }
        );

        if (updatedRows === 0) {
            return new Response(JSON.stringify({ error: "2FA Update failed. User not found?" }), { status: 404 });
        }

        return new Response(JSON.stringify({
            success: true,
            message: "2FA Setting updated successfully!",
        }), { status: 200 });
    } catch (error) {
        console.error("Update User Error:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}