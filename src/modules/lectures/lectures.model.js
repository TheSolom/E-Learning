import {Model,DataTypes} from 'sequelize'
import { sequelize } from '../../config/postgres'

class Lecture extends Model {}

Lecture.init(
    {
        id: {
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull:false
        },
        description: {
            type:DataTypes.TEXT,
        },
        videoUrl: {
            type: DataTypes.STRING,
            allowNull: false
        },
    chapterId:{}, //TODO
    addedBy:{},
    },
    {
        sequelize,
        modelName:'lecture',
        freezeTableName: true,
        paranoid:true,
    }
);

export default Lecture;