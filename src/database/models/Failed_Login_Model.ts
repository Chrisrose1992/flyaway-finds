import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes } from "sequelize";

export interface FailedLoginAttemptAttributes extends Model<
    InferAttributes<FailedLoginAttemptAttributes>,
    InferCreationAttributes<FailedLoginAttemptAttributes>
> {
    id: string;
    userId: string;
    attempts: number;
    lastAttempt: Date;
    isLocked: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export default (sequelize: Sequelize) => {
    const FailedLoginAttempt = sequelize.define<FailedLoginAttemptAttributes>(
        "FailedLoginAttempt",
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
            attempts: {
                type: DataTypes.INTEGER,
                defaultValue: 1,
                allowNull: false,
            },
            lastAttempt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: false,
            },
            isLocked: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
        },
        {
            timestamps: true,
            indexes: [
                { fields: ["userId"] },
                { fields: ["lastAttempt"] },
                { fields: ["isLocked"] },
            ],
        }
    );

    return FailedLoginAttempt;
};