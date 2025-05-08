import { NextResponse } from 'next/server';
import db from '@/database/sequelize';
import { getCookie } from '@/utils/auth';
import { cookies } from "next/headers";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET as string);

const { SendToken, User, UserSettings, sequelize } = db;

export async function POST(req: Request) {
    const transaction = await sequelize.transaction();
    try {
        const { otpCode } = await req.json();

        if (!otpCode) {
            await transaction.rollback();
            console.error("Missing OTP code");
            return NextResponse.json(
                { error: "Please enter a valid OTP Code" },
                { status: 400 }
            );
        }

        const cookieData = await getCookie('verifyEmail');
        if (!cookieData) {
            await transaction.rollback();
            return NextResponse.json(
                { error: "Verification cookie not found" },
                { status: 400 }
            );
        }

        const { key, userId } = cookieData;

        const user = await User.findOne({ where: { id: userId }, raw: true, transaction });
        if (!user) {
            await transaction.rollback();
            return NextResponse.json(
                { error: "User not found", redirect: '/auth/login' },
                { status: 404 }
            );
        }

        const tokenRecord = await SendToken.findOne({ where: { key }, raw: true, transaction });
        if (!tokenRecord) {
            await transaction.rollback();
            return NextResponse.json(
                { error: "Invalid or expired verification key" },
                { status: 400 }
            );
        }

        if (tokenRecord.token !== otpCode) {
            await transaction.rollback();
            return NextResponse.json(
                { error: "Invalid OTP code" },
                { status: 400 }
            );
        }

        if (tokenRecord.expires && new Date(tokenRecord.expires) < new Date()) {
            await transaction.rollback();
            return NextResponse.json(
                { error: "OTP has expired", redirect: '/auth/login' },
                { status: 400 }
            );
        }

        await User.update(
            { status: 'active' },
            { where: { id: userId }, transaction }
        );

        await UserSettings.update(
            { emailVerified: true },
            { where: { userId }, transaction }
        );

        await SendToken.destroy({ where: { token: otpCode }, transaction });

        let stripeCustomer;
        try {
            stripeCustomer = await stripe.customers.create({
                email: user.email,
                name: `${user.firstname} ${user.lastname}`,
                metadata: {
                    userId: user.id.toString(),
                },
            });
        } catch (stripeError) {
            await transaction.rollback();
            console.error('Failed to create Stripe customer:', stripeError);
            return NextResponse.json(
                { error: 'An error occurred while creating Stripe customer.' },
                { status: 500 }
            );
        }

        await User.update(
            { stripeCustomerId: stripeCustomer.id, status: 'active' },
            { where: { id: userId }, transaction }
        );

        await transaction.commit();

        // Clear the verification cookie.
        const cookieStore = await cookies();
        cookieStore.set('verifyEmail', '', { expires: new Date(0), path: '/' });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Verification Error:", error);
        await transaction.rollback();
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
