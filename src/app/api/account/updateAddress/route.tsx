import { getAuthCookie } from '@/utils/auth';
import db from '@/database/sequelize';
import validator from 'validator';

const { UserAddress } = db;

export async function POST(req: Request) {
    try {
        const raw = await req.json();
        const userId = await getAuthCookie('authToken');

        if (!userId) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        const sanitize = (val: string) => validator.escape(val.trim());

        const name = sanitize(raw.name || '');
        const address1 = sanitize(raw.address1 || '');
        const address2 = sanitize(raw.address2 || '');
        const city = sanitize(raw.city || '');
        const zip = sanitize(raw.zip || '');
        const country = sanitize(raw.country || '');


        const [updatedRows] = await UserAddress.update(
            { name, address1, address2, city, zip, country },
            { where: { userId } }
        );

        if (updatedRows === 0) {
            return new Response(JSON.stringify({ error: "Address update failed." }), { status: 400 });
        }

        return new Response(JSON.stringify({
            success: true,
            message: "Address updated successfully!",
        }), { status: 200 });

    } catch (error) {
        console.error("Address update error:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}
