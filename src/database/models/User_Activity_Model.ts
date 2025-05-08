import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes } from "sequelize";

export interface UserActivityAttributes extends Model<
    InferAttributes<UserActivityAttributes>,
    InferCreationAttributes<UserActivityAttributes>
> {
    id: string;
    userId: string;
    ipAddress: string;
    device?: string;
    os?: string;
    browser?: string;
    location?: string;
    lastLoginAt: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export default (sequelize: Sequelize) => {
    const UserActivity = sequelize.define<UserActivityAttributes>(
        "UserActivity",
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
            ipAddress: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            device: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            os: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            browser: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            location: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            lastLoginAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            timestamps: true,
            indexes: [
                { fields: ["userId"] },
                { fields: ["ipAddress"] },
                { fields: ["lastLoginAt"] },
            ],
        }
    );
    return UserActivity;
};