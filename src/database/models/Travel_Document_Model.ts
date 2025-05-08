import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes } from "sequelize";
import crypto from "crypto";
import { Op } from "sequelize";

const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY || "", "hex");
const IV_LENGTH = 16;

function encrypt(text: string): string {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return `${iv.toString("hex")}:${encrypted}`;
}

function decrypt(text: string): string {
    const [iv, encryptedText] = text.split(":");
    const decipher = crypto.createDecipheriv("aes-256-cbc", ENCRYPTION_KEY, Buffer.from(iv, "hex"));
    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}

export interface TravelDocumentAttributes extends Model<
    InferAttributes<TravelDocumentAttributes>,
    InferCreationAttributes<TravelDocumentAttributes>
> {
    id: string;
    userId: string;
    documentType: string;
    documentNumber: string;
    nationality: string;
    countryOfIssue: string;
    expiryDate: Date;
    isDefault: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export default (sequelize: Sequelize) => {
    const TravelDocument = sequelize.define<TravelDocumentAttributes>(
        "TravelDocument",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            documentType: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            documentNumber: {
                type: DataTypes.STRING,
                allowNull: false,
                set(value: string) {
                    this.setDataValue("documentNumber", encrypt(value));
                },
                get() {
                    const encryptedValue = this.getDataValue("documentNumber");
                    return encryptedValue ? decrypt(encryptedValue) : null;
                },
            },
            nationality: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            countryOfIssue: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            expiryDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            isDefault: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            timestamps: true,
            indexes: [
                { fields: ["userId"] },
                { fields: ["documentType"] },
                { fields: ["expiryDate"] },
            ],
        }
    );

    TravelDocument.beforeUpdate(async (doc) => {
        if (doc.isDefault) {
            await sequelize.models.TravelDocument.update(
                { isDefault: false },
                { where: { userId: doc.userId, id: { [Op.ne]: doc.id } } }
            );
        }
    });

    return TravelDocument;
};