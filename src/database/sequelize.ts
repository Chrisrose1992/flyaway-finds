import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

// Initialize Sequelize
const sequelize = new Sequelize(
    process.env.DB_DATABASE as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    {
        host: process.env.DB_HOST as string,
        port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
        dialect: "mysql",
        dialectModule: mysql2,
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        logging: false,
    }
);

// Test Connection
(async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully!");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
})();

// Load Models
import UserModel from "./models/User_Model";
import UserSettingsModel from "./models/User_Setting_Model";
import UserAddressModel from "./models/User_Address_Model";
import PassengerModel from "./models/Passenger_Model";
import SendTokenModel from "./models/Send_Token_Model";
import TravelDocumentModel from "./models/Travel_Document_Model";
import FailedLoginAttemptModel from "./models/Failed_Login_Model";
import UserActivityModel from "./models/User_Activity_Model";
import FaqModel from "./models/Faq_Model";
import FaqAnswerModel from "./models/Faq_Answer_Model";
import AirportModel from "./models/Airport_Model";
import DestinationModel from "./models/Destination_Model";
import BookingModel from "./models/Booking_Model";

// Initialize models
const User = UserModel(sequelize);
const UserSettings = UserSettingsModel(sequelize);
const UserAddress = UserAddressModel(sequelize);
const Passenger = PassengerModel(sequelize);
const SendToken = SendTokenModel(sequelize);
const TravelDocument = TravelDocumentModel(sequelize);
const FailedLoginAttempt = FailedLoginAttemptModel(sequelize);
const UserActivity = UserActivityModel(sequelize);
const Faq = FaqModel(sequelize);
const FaqAnswer = FaqAnswerModel(sequelize);
const Airport = AirportModel(sequelize);
const Destination = DestinationModel(sequelize);
const Booking = BookingModel(sequelize);

// Set up relationships
User.hasOne(UserSettings, { foreignKey: "userId", as: "settings" });
UserSettings.belongsTo(User, { foreignKey: "userId", as: "user" });

User.hasOne(UserAddress, { foreignKey: "userId", as: "address" });
UserAddress.belongsTo(User, { foreignKey: "userId", as: "user" });

User.hasMany(Passenger, { foreignKey: "userId", as: "passengers" });
Passenger.belongsTo(User, { foreignKey: "userId", as: "user" });

Passenger.hasMany(TravelDocument, { foreignKey: "passengerId", as: "documents" });
TravelDocument.belongsTo(Passenger, { foreignKey: "passengerId", as: "passenger" });

User.hasMany(UserActivity, { foreignKey: "userId", as: "activities" });
UserActivity.belongsTo(User, { foreignKey: "userId", as: "user" });

Faq.hasMany(FaqAnswer, { foreignKey: "faqId", as: "answers" });
FaqAnswer.belongsTo(Faq, { foreignKey: "faqId", as: "faq" });

// Sync Database
const syncDB = async () => {
    try {
        await sequelize.sync({ alter: false });
        console.log("Database synchronized successfully!");
    } catch (error) {
        console.error("Database synchronization failed:", error);
    }
};

syncDB();

// Export DB & Models
const db = {
    sequelize,
    Sequelize,
    User,
    UserSettings,
    UserAddress,
    Passenger,
    SendToken,
    TravelDocument,
    FailedLoginAttempt,
    UserActivity,
    Faq,
    FaqAnswer,
    Airport,
    Destination,
    Booking,
};

export default db;