import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";

export interface UserAttributes extends Model<
    InferAttributes<UserAttributes>,
    InferCreationAttributes<UserAttributes>
> {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber?: string;
    gender?: string;
    title?: string;
    dob?: Date;
    password: string;
    stripeCustomerId?: string;
    role: "customer" | "admin" | "agent";
    status: "active" | "inactive" | "banned";
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}

export default (sequelize: Sequelize) => {
    const User = sequelize.define<UserAttributes>(
        "User",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            firstname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lastname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            phoneNumber: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            dob: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            stripeCustomerId: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            gender: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: DataTypes.ENUM("customer", "admin", "agent"),
                defaultValue: "customer",
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM("active", "inactive", "banned"),
                defaultValue: "inactive",
                allowNull: false,
            },
        },
        {
            timestamps: true,
            paranoid: true,
            indexes: [{ unique: true, fields: ["email"] }],
        }
    );
    return User;
};