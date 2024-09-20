import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../../shared/config/postgres.js';

class UserRole extends Model { }

UserRole.init(
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
        roleId: {
            type: DataTypes.SMALLINT,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'role',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        modelName: 'user_role',
        freezeTableName: true,
        timestamps: true,
        updatedAt: false,
    },
);

export default UserRole;
