import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes } from "sequelize";

export interface FaqAnswerAttributes extends Model<
    InferAttributes<FaqAnswerAttributes>,
    InferCreationAttributes<FaqAnswerAttributes>
> {
    id: string;
    title: string;
    slug: string;
    headerImg?: string;
    intro?: string;
    text: string;
    bulletPoints?: object;
    relatedQuestions?: object;
    footerNote?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export default (sequelize: Sequelize) => {
    const FaqAnswer = sequelize.define<FaqAnswerAttributes>(
        "FaqAnswer",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            slug: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            headerImg: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            intro: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            text: {
                type: DataTypes.TEXT("long"),
                allowNull: false,
            },
            bulletPoints: {
                type: DataTypes.JSON,
                allowNull: true,
            },
            relatedQuestions: {
                type: DataTypes.JSON,
                allowNull: true,
            },
            footerNote: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        },
        {
            timestamps: true,
            indexes: [
                { fields: ["slug"], unique: true },
                { fields: ["faqId"] },
            ],
        }
    );

    return FaqAnswer;
};
