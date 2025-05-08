import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes } from "sequelize";

export interface DestinationAttributes extends Model<
    InferAttributes<DestinationAttributes>,
    InferCreationAttributes<DestinationAttributes>
> {
    id: string;
    title: string;
    description: string;
    letter: string;
    slug: string;
    country: string;
    holidayType: string[];
    attractions: {
        top: string[];
        type: string[];
    };
    whenToGo: string;
    image: string;
    latitude?: number;
    longitude?: number;
}

export default (sequelize: Sequelize) => {
    return sequelize.define<DestinationAttributes>(
        "Destination",
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
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            letter: {
                type: DataTypes.STRING(1),
                allowNull: false,
            },
            slug: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            country: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            holidayType: {
                type: DataTypes.TEXT, // Stored as JSON string
                allowNull: false,
                get() {
                    const raw = this.getDataValue('holidayType');
                    return raw ? JSON.parse(raw) : [];
                },
                set(value: string[]) {
                    this.setDataValue('holidayType', JSON.stringify(value));
                },
            },
            attractions: {
                type: DataTypes.JSON,
                allowNull: false,
            },
            whenToGo: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            image: {
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
            timestamps: false,
            indexes: [
                { fields: ["title"] },
                { fields: ["country"] },
                { fields: ["slug"] },
            ],
        }
    );
};