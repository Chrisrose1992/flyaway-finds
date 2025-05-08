import crypto from 'crypto';
import db from '@/database/sequelize';
import { v4 as uuidV4 } from 'uuid';
import validator from 'validator';

const { SendToken, sequelize } = db;

interface TokenData {
    code: string;
    key: string;
    expirationTime: Date;
}

export default async function generateCode(
    userId: string,
    tokenName: string
): Promise<TokenData> {

    if (!validator.isUUID(userId, 4)) {
        throw new Error("generateCode: Invalid user ID format.");
    }

    const transaction = await sequelize.transaction();

    try {
        const id = uuidV4();
        const code = String(crypto.randomInt(100000, 999999));
        const expirationTime = new Date(Date.now() + 15 * 60 * 1000);
        const key = uuidV4();

        await SendToken.upsert(
            {
                id,
                userId,
                key, token:
                code,
                expires: expirationTime,
                tokenName
            },
            { transaction }
        );

        await transaction.commit();
        return { code, key, expirationTime };

    } catch (error) {
        await transaction.rollback();

        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        console.error("Error generating authentication code:", errorMessage);
        throw new Error("Failed to generate authentication code. Please try again.");
    }

}
