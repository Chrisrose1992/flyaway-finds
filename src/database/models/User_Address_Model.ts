import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes } from "sequelize";

export interface UserAddressAttributes extends Model<
    InferAttributes<UserAddressAttributes>,
    InferCreationAttributes<UserAddressAttributes>
> {
    userId: string;
    isDefault: boolean;
    name?: string;
    address1?: string;
    address2?: string;
    city?: string;
    zip?: string;
    country?: string;
    latitude?: number;
    longitude?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export default (sequelize: Sequelize) => {
    const UserAddress = sequelize.define<UserAddressAttributes>(
        "UserAddress",
        {
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
            },
            isDefault: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            address1: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            address2: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            city: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            zip: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            country: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            latitude: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            longitude: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
        },
        {
            timestamps: true,
            indexes: [
                { fields: ["userId"] },
                { fields: ["isDefault"] },
                { fields: ["city"] },
                { fields: ["country"] },
            ],
        }
    );
    return UserAddress;
};