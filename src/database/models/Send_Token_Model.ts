import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes } from "sequelize";

export interface SendTokenAttributes extends Model<
    InferAttributes<SendTokenAttributes>,
    InferCreationAttributes<SendTokenAttributes>
> {
    id: string;
    userId: string;
    tokenName: string;
    token: string;
    key: string;
    expires: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export default (sequelize: Sequelize) => {
    const SendToken = sequelize.define<SendTokenAttributes>(
        "SendToken",
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
            tokenName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            token: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            key: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            expires: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            timestamps: true,
            indexes: [
                { fields: ["userId"] },
                { fields: ["tokenName"] },
            ],
        }
    );
    return SendToken;
};