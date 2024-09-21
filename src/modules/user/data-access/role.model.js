import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../../shared/config/postgres.js';

class Role extends Model { }

Role.init(
    {
        id: {
            type: DataTypes.SMALLINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false,
            unique: true,
        },
        sortOrder: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        sequelize,
        modelName: 'role',
        freezeTableName: true,
        timestamps: true,
        paranoid: true,
    },
);

export default Role;