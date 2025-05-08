import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes } from "sequelize";

export interface BookingAttributes extends Model<
    InferAttributes<BookingAttributes>,
    InferCreationAttributes<BookingAttributes>
> {
    userId?: number;
    bookingType: string;
    amadeusBookingId?: string;
    status: string;
    totalPrice: number;
    currency: string;
    stripePaymentId?: string;
    travelers: object;
    offerData: object;
    extras?: object;
    createdAt?: Date;
    updatedAt?: Date;
}

export default (sequelize: Sequelize) => {
    const Booking = sequelize.define<BookingAttributes>(
        "Booking",
        {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            bookingType: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            amadeusBookingId: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            status: {
                type: DataTypes.STRING,
                defaultValue: "pending",
            },
            totalPrice: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            currency: {
                type: DataTypes.STRING,
                defaultValue: "GBP",
            },
            stripePaymentId: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            travelers: {
                type: DataTypes.JSON,
                allowNull: false,
            },
            offerData: {
                type: DataTypes.JSON,
                allowNull: false,
            },
            extras: {
                type: DataTypes.JSON,
                allowNull: true,
            },
        },
        {
            timestamps: true,
        }
    );
    return Booking;
};
