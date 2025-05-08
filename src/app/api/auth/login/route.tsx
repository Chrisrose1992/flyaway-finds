import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/database/sequelize";
import validator from "validator";
import generateCode from "@/utils/generateCode";
import { logUserActivity } from "@/utils/logUserActivity";
import { v4 as uuidV4 } from 'uuid';
import { setAuthCookie, setCookies } from '@/utils/auth';
import { sendMail } from '@/middleware/sendMail';

const { User, UserSettings, FailedLoginAttempt, UserActivity } = db;

const MAX_ATTEMPTS = 5;

export async function POST(req: Request) {
    try {
        const { email, password, remember } = await req.json();
        const cleanEmail = validator.normalizeEmail(email);

        const user = await User.findOne({ where: { email: cleanEmail }, raw: true });
        if (!user) {
            return NextResponse.json({ success: false, error: "Invalid email or password." });
        }

        if (user.status === "banned") {
            return NextResponse.json({
                success: false,
                error: "Account is locked.",
                redirect: "/auth/unlock-account",
            });
        }

        let failedLoginAttempt = await FailedLoginAttempt.findOne({ where: { userId: user.id } });

        if (failedLoginAttempt?.isLocked) {
            const { code, key, expirationTime } = await generateCode(user.id, "accountLocked");
            await setCookies("accountLocked", expirationTime, { id: user.id, email: user.email, key });
            await sendMail(req, 'securityCode', 'Unlock Your Account', `${user.firstname} ${user.lastname}`, user.email, {
                action_message: 'Your account has been temporarily locked due to multiple failed login attempts. Use this code to unlock your account.',
                code: code,
                action_link: '/auth/unlock-account/',
                cta_text: 'Unlock Account'
            });

            return NextResponse.json({
                success: false,
                error: "Account is locked due to too many failed attempts.",
                redirect: "/auth/unlock-account",
            });
        }

        if (!(await bcrypt.compare(password, user.password))) {
            if (!failedLoginAttempt) {
                await FailedLoginAttempt.create({
                    id: uuidV4(),
                    userId: user.id,
                    attempts: 1,
                    lastAttempt: new Date(),
                    isLocked: false,
                });
            } else {
                failedLoginAttempt.attempts += 1;
                if (failedLoginAttempt.attempts >= MAX_ATTEMPTS) {
                    failedLoginAttempt.isLocked = true;
                    await failedLoginAttempt.save();
                    const { key, expirationTime } = await generateCode(user.id, "accountLocked");
                    await setCookies("accountLocked", expirationTime, { id: user.id, email: user.email, key });
                    return NextResponse.json({
                        success: false,
                        error: "Account is locked due to too many failed attempts.",
                        redirect: "/auth/unlock-account",
                    });
                }
                await failedLoginAttempt.save();
            }
            return NextResponse.json({ success: false, error: "Invalid email or password." });
        }

        const settings = await UserSettings.findOne({
            where: { userId: user.id },
            raw: true,
        });

        if (!settings?.emailVerified) {
            const { key, expirationTime } = await generateCode(user.id, "verifyEmail");
            await sendMail(req, 'verifyEmail', 'Verify Your Email', `${user.firstname} ${user.lastname}`, user.email, { Key: key });
            await setCookies("verifyEmail", expirationTime, { id: user.id, email: user.email, key });
            return NextResponse.json({ redirect: "/auth/verify-email" });
        }

        await logUserActivity(req, {id: user.id});

        if (remember) {
            await setCookies("rememberedMe", new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), {
                email: user.email,
            });
        }

        if (failedLoginAttempt) {
            await failedLoginAttempt.destroy();
        }

        const token = await setAuthCookie(user.id, user.role);

        if (settings?.twoFactorEnabled) {
            const { key, expirationTime } = await generateCode(user.id, "2fa");
            await setCookies("2fa", expirationTime, { id: user.id, email: user.email, key });
            return NextResponse.json({ redirect: "/auth/2fa" });
        }

        return NextResponse.json({
            success: true,
            token,
            redirect: '/'
        });

    } catch (error) {
        console.error("Login Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
