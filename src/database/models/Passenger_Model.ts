import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes } from "sequelize";

export interface PassengerAttributes extends Model<
    InferAttributes<PassengerAttributes>,
    InferCreationAttributes<PassengerAttributes>
> {
    id: string;
    userId: string;
    title: string;
    firstName: string;
    lastName: string;
    dob: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export default (sequelize: Sequelize) => {
    const Passenger = sequelize.define<PassengerAttributes>(
        "Passenger",
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
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            dob: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            timestamps: true,
        }
    );
    return Passenger;
};