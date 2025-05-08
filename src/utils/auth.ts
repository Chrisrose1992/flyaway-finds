import jwt from "jsonwebtoken";
import {cookies} from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
    throw new Error("Missing JWT_SECRET in environment variables");
}

const JWT_OPTIONS: jwt.SignOptions = {
    algorithm: "HS256",
    expiresIn: "24h",
};

export async function setAuthCookie( userId: string, role: string): Promise<string> {

    const token = jwt.sign({ id: userId, role: role }, JWT_SECRET, JWT_OPTIONS);

    const cookieStore = await cookies();

    cookieStore.set("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    return token
}

export async function getAuthCookie(cookieName: string): Promise<string | null> {
    try {
        const cookieStore = await cookies();
        const cookieValue = cookieStore.get(cookieName);

        if (!cookieValue) {
            return null;
        }

        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not defined in environment variables");
            return null;
        }

        const decodedToken = jwt.verify(
            cookieValue.value,
            process.env.JWT_SECRET
        ) as { id: string };

        return decodedToken.id;
    } catch (error: any) {
        if (error.name === "TokenExpiredError") {
            console.error("JWT token has expired:", error);
        } else if (error.name === "JsonWebTokenError") {
            console.error("Invalid JWT token:", error);
        } else {
            console.error("Error verifying auth cookie:", error);
        }
        return null;
    }
}

export async function getCookie(type: string): Promise<any> {
    const cookieStore = await cookies();
    const cookieData = cookieStore.get(type);

    if (!cookieData) {
        return { error: "Cookie not found" };
    }

    try {
        return JSON.parse(cookieData.value);
    } catch {
        return null;
    }
}

export async function setCookies(cookieName: string, expirationTime: Date, data: any ): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set(cookieName, JSON.stringify(data), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        expires: new Date(expirationTime),
    });
}