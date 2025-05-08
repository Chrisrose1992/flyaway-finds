import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes } from "sequelize";

export interface FaqAttributes extends Model<
    InferAttributes<FaqAttributes>,
    InferCreationAttributes<FaqAttributes>
> {
    id: string;
    category: string;
    categorySlug: string;
    question: string;
    slug: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export default (sequelize: Sequelize) => {
    const Faq = sequelize.define<FaqAttributes>(
        "Faq",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            category: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            categorySlug: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            question: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            slug: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
        },
        {
            timestamps: true,
            indexes: [
                { fields: ["slug"], unique: true },
                { fields: ["categorySlug"] },
            ],
        }
    );
    return Faq;
};