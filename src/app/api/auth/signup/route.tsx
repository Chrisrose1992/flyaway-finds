import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/database/sequelize";
import validator from "validator";
import generateCode from "@/utils/generateCode";
import { logUserActivity } from "@/utils/logUserActivity";
import { v4 as uuidV4 } from "uuid";
import { sendMail } from "@/middleware/sendMail";
import { setCookies } from "@/utils/auth";

const { User, UserSettings, UserAddress, sequelize } = db;

export async function POST(req: Request) {
    const transaction = await sequelize.transaction();

    try {
        const { email, firstname, lastname, marketing, password } = await req.json();
        const cleanEmail = validator.normalizeEmail(email) || "";

        if (!cleanEmail) {
            return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
        }

        const findUser = await User.findOne({ where: { email: cleanEmail }, raw: true });

        if (findUser) {
            return NextResponse.json({
                redirect: "/auth/login",
                error: "User already exists, please try logging in",
            });
        }

        const userId = uuidV4();
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create(
            {
                id: userId,
                firstname,
                lastname,
                email: cleanEmail,
                password: hashedPassword,
                phoneNumber: "",
                gender: "",
                title: "",
                stripeCustomerId: "",
                status: "inactive",
                role: "customer",
            },
            { transaction }
        );

        await Promise.all([
            UserSettings.create(
                {
                    userId,
                    twoFactorEnabled: false,
                    emailNotifications: true,
                    smsNotifications: true,
                    emailVerified: false,
                    emailMarketing: Boolean(marketing),
                    preferredLanguage: "en",
                    timeZone: "GMT",
                },
                { transaction }
            ),
            UserAddress.create(
                {
                    userId: userId,
                    address1: "",
                    address2: "",
                    city: "",
                    zip: "",
                    country: "Unknown",
                    isDefault: true,
                },
                { transaction }
            ),
        ]);
        await transaction.commit();

        await logUserActivity(req, { id: user.id }); // No unused variable
        const codeData = await generateCode(user.id, "verifyEmail");

        await sendMail(req, "verifyEmail", "Verify Your Email", `${user.firstname} ${user.lastname}`, user.email, { Key: codeData.code })
            .then(() => console.log("Verification email sent successfully"))
            .catch((error) => console.error("Error sending email:", error));

        await setCookies("verifyEmail", codeData.expirationTime, { id: user.id, email: user.email, key: codeData.key })
            .then(() => console.log("Verification cookie set successfully"))
            .catch((error) => console.error("Error setting cookie:", error));

        return NextResponse.json({
            success: true,
            message: "Signup successful. Please check your email for verification.",
        });

    } catch (error) {
        await transaction.rollback();
        console.error("Signup Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
