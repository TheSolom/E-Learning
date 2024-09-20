import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../../shared/config/postgres.js';

class Token extends Model { }

Token.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        token: {
            type: DataTypes.STRING(512),
            allowNull: false,
            unique: true,
        },
        blocked: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        expiryDateTime: {
            type: DataTypes.DATE,
            allowNull: false,
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
        modelName: 'token',
        freezeTableName: true,
        timestamps: true,
        updatedAt: false,
    },
);

export default Token;