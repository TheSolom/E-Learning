import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../config/postgres.js';

class UserLink extends Model { }

UserLink.init(
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
        linkId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'link',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        modelName: 'user_link',
        freezeTableName: true,
    },
);

export default UserLink;