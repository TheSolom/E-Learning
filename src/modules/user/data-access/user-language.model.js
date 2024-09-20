import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../../shared/config/postgres.js';

class UserLanguage extends Model { }

UserLanguage.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        languageId: {
            type: DataTypes.SMALLINT,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'language',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        modelName: 'user_language',
        freezeTableName: true,
        updatedAt: false,
    },
);

export default UserLanguage;