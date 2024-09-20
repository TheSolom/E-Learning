import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../../shared/config/postgres.js';

class Website extends Model { }

Website.init(
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
        }
    },
    {
        sequelize,
        modelName: 'website',
        freezeTableName: true,
        timestamps: false,
    },
);

export default Website;