import { NextResponse } from 'next/server';
import db from '@/database/sequelize';
import generateCode from "@/utils/generateCode";
import { getCookie, setCookies } from '@/utils/auth';
import { sendMail } from '@/middleware/sendMail';

const { SendToken, User } = db;

const routeMap: { [key: string]: string } = {
    verifyEmail: "/auth/verify-email",
    twoFactor: "/auth/2fa",
    unlockAccount: "/auth/unlock-account"
};

const emailTemplateMap: { [key: string]: string } = {
    verifyEmail: "verifyEmail",
    twoFactor: "securityCode",
    unlockAccount: "securityCode"
};

export async function POST(req: Request) {
    try {
        const { type } = await req.json();

        if (!type || !Object.keys(routeMap).includes(type)) {
            return NextResponse.json(
                { error: 'Invalid type specified' },
                { status: 400 }
            );
        }

        const redirectRoute = routeMap[type];

        const cookieData = await getCookie(type);
        if (!cookieData) {
            return NextResponse.json(
                { error: "Verification cookie not found" },
                { status: 400 }
            );
        }

        const { id, key } = cookieData;

        const tokenRecord = await SendToken.findOne({
            where: { userId: id, key },
            raw: true
        });

        if (!tokenRecord) {
            return NextResponse.json(
                { error: "Invalid or expired verification key" },
                { status: 400 }
            );
        }

        if (tokenRecord.expires && new Date(tokenRecord.expires) < new Date()) {
            return NextResponse.json(
                { error: "OTP has expired", redirect: '/auth/login' },
                { status: 400 }
            );
        }

        const user = await User.findOne({ where: { id } });
        if (!user) {
            return NextResponse.json(
                { error: "User not found", redirect: '/auth/login' },
                { status: 404 }
            );
        }

        await SendToken.destroy({ where: { key, userId: id } });

        const { code, key: newKey, expirationTime } = await generateCode(user.id, type);

        let subject: string;

        let emailData: { [key: string]: string };

        if (type === 'twoFactor') {
            subject = 'Your 2FA Code';
            emailData = {
                action_message:
                    'Here is your secure one-time authentication code. Please use this code within the next 5 minutes to verify your login.',
                code: code,
                cta_text: 'Verify Login'
            };
        } else if (type === 'unlockAccount') {
            subject = 'Unlock Your Account';
            emailData = {
                action_message:
                    'Your account has been locked due to multiple failed login attempts. Use the code below to unlock your account.',
                code: code,
                cta_text: 'Unlock Account'
            };
        } else {
            subject = 'Verify Your Email';
            emailData = { Key: code };
        }

        await sendMail(
            req,
            emailTemplateMap[type],
            subject,
            `${user.firstname} ${user.lastname}`,
            user.email,
            {
                ...emailData,
                code: code
            }
        );

        await setCookies(type, expirationTime, { id: user.id, email: user.email, key: newKey });

        return NextResponse.json({ redirect: redirectRoute });
    } catch (error) {
        console.error("Resend Token Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
