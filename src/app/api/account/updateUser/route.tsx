import { getAuthCookie } from '@/utils/auth';
import db from '@/database/sequelize';
import validator from 'validator';

const { User } = db;

export async function POST(req: Request) {
    try {
        const raw = await req.json();
        const userId = await getAuthCookie('authToken');

        if (!userId) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        const sanitize = (val: string) => validator.escape(val.trim());

        const title = sanitize(raw.title || '');
        const firstname = sanitize(raw.firstname || '');
        const lastname = sanitize(raw.lastname || '');
        const birthDay = sanitize(raw.birthDay || '');
        const birthMonth = sanitize(raw.birthMonth || '');
        const birthYear = sanitize(raw.birthYear || '');
        const email = sanitize(raw.email || '');
        const phoneNumber = sanitize(raw.phoneNumber || '');
        const gender = raw.gender || '';

        if (!validator.isEmail(email)) {
            return new Response(JSON.stringify({ error: "Invalid email address" }), { status: 400 });
        }

        const dob = new Date(`${birthYear}-${birthMonth}-${birthDay}`);

        if (isNaN(dob.getTime())) {
            return new Response(JSON.stringify({ error: "Invalid date of birth" }), { status: 400 });
        }

        const [updatedRows] = await User.update(
            { title, gender, firstname, lastname, dob, email, phoneNumber },
            { where: { id: userId } }
        );

        if (updatedRows === 0) {
            return new Response(JSON.stringify({ error: "Update failed. User not found?" }), { status: 404 });
        }

        return new Response(JSON.stringify({
            success: true,
            message: "Profile updated successfully!",
        }), { status: 200 });

    } catch (error) {
        console.error("Update User Error:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}
