import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../../shared/config/postgres.js';

class Language extends Model { }

Language.init(
    {
        id: {
            type: DataTypes.SMALLINT,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false,
            unique: true
        },
    },
    {
        sequelize,
        modelName: 'language',
        freezeTableName: true,
        timestamps: false,
    },
);

export default Language;