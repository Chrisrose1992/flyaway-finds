import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";

export interface UserSettingAttributes extends Model<
    InferAttributes<UserSettingAttributes>,
    InferCreationAttributes<UserSettingAttributes>
> {
    userId: string;
    twoFactorEnabled?: boolean;
    emailNotifications?: boolean;
    smsNotifications?: boolean;
    emailVerified: boolean;
    emailMarketing: boolean;
    preferredLanguage: string;
    timeZone?: string;
}

export default (sequelize: Sequelize) => {
    const UserSetting = sequelize.define<UserSettingAttributes>(
        "UserSettings",
        {
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
            },
            twoFactorEnabled: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            emailNotifications: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
            smsNotifications: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
            emailVerified: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            emailMarketing: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            preferredLanguage: {
                type: DataTypes.STRING,
                defaultValue: "en",
                allowNull: false,
            },
            timeZone: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
    );

    return UserSetting;
};
