import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../config/postgres.js';

class Link extends Model { }

Link.init(
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
        }
    },
    {
        sequelize,
        modelName: 'link',
        freezeTableName: true,
    },
);

export default Link;