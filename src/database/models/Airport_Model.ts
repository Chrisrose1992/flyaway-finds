import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes } from "sequelize";

export interface AirportAttributes extends Model<
    InferAttributes<AirportAttributes>,
    InferCreationAttributes<AirportAttributes>
> {
    id: string;
    iataCode: string;
    name: string;
    city: string;
    country: string;
    latitude?: number;
    longitude?: number;
}

export default (sequelize: Sequelize) => {
    const Airport = sequelize.define<AirportAttributes>(
        "Airport",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            iataCode: {
                type: DataTypes.STRING(3),
                allowNull: false,
                unique: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            country: {
                type: DataTypes.STRING,
                allowNull: false,
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
            timestamps: false,
            indexes: [{ unique: true, fields: ["iataCode"] }],
        }
    );
    return Airport;
};