import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../../shared/config/postgres.js';

class UserWebsite extends Model { }

UserWebsite.init(
    {
        url: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        websiteId: {
            type: DataTypes.SMALLINT,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'website',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        modelName: 'user_website',
        freezeTableName: true,
        timestamps: true,
    },
);

export default UserWebsite;
