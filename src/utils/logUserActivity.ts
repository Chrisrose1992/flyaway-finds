import requestIp from "request-ip";
import { UAParser } from "ua-parser-js";
import { IncomingMessage } from "http";
import db from '@/database/sequelize';

const { UserActivity } = db;

export function extractDeviceInfo(req: Request) {
    const ip =
        requestIp.getClientIp(req as unknown as IncomingMessage) ||
        req.headers.get("x-forwarded-for") ||
        "Unknown IP";

    const userAgent = req.headers.get("user-agent") || "Unknown Device";
    const parser = new UAParser(userAgent);
    const parsedUA = parser.getResult();

    const formatNameVersion = (
        entity: { name?: string; version?: string },
        fallback: string
    ) => {
        return entity.name ? `${entity.name} ${entity.version || ""}`.trim() : fallback;
    };

    const os = formatNameVersion(parsedUA.os, "Unknown OS");
    const browser = formatNameVersion(parsedUA.browser, "Unknown Browser");
    const device = parsedUA.device.type || "Desktop";

    return { ip, os, browser, device };
}

export async function logUserActivity(request: Request, user: { id: string }) {
    try {
        const deviceInfo = extractDeviceInfo(request);

        const existingDevice = await UserActivity.findOne({
            where: {
                userId: user.id,
                ipAddress: deviceInfo.ip,
                device: deviceInfo.device,
                os: deviceInfo.os,
                browser: deviceInfo.browser,
            },
        });

        if (!existingDevice) {
            await UserActivity.create({
                id: crypto.randomUUID(),
                userId: user.id,
                ipAddress: deviceInfo.ip,
                device: deviceInfo.device,
                os: deviceInfo.os,
                browser: deviceInfo.browser,
                location: "Unknown Location",
                lastLoginAt: new Date(),
            });
        } else {
            await existingDevice.update({ lastLoginAt: new Date() });
        }

        console.log('added to db')

        return true;
    } catch (error) {
        console.error("Error in logUserActivity:", error);
        return false;
    }
}