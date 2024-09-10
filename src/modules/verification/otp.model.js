import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../config/postgres.js';

class OTP extends Model { }

OTP.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        otp: {
            type: DataTypes.STRING(6),
            allowNull: false,
            unique: true,
        },
        purpose: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        expiryDateTime: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date(Date.now() + process.env.OTP_EXPIRES_IN * 1000), // In milliseconds
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        modelName: 'otp',
        freezeTableName: true,
        timestamps: true,
        updatedAt: false,
    },
);

export default OTP;