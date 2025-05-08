import { NextResponse } from "next/server";
import sequelize from "@/database/sequelize";


export async function GET(req: Request) {
    try {
        await sequelize;
        console.log("Database synced via API call!");

        return NextResponse.json({ success: true, message: "Database synced successfully!" });
    } catch (error) {
        console.error("Database sync failed:", error);
        return NextResponse.json({ success: false, error: "Database sync failed." }, { status: 500 });
    }
}