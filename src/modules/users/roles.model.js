import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../config/postgres.js';

class Role extends Model { }

Role.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false,
            unique: true,
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