import {Model,DataTypes} from 'sequelize'
import { sequelize } from '../../config/postgres'

class Course extends Model {}

Course.init(
    {
        id: {
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey: true,
        },
        instructorId:{
            type:DataTypes.INTEGER,
            references:{
                model:'user',
                key:'id',
                deferrable: Deferrable.INITIALLY_IMMEDIATE,

            } 
        },
        title: {
            type: DataTypes.STRING,
            allowNull:false
        },
        description: {
            type:DataTypes.TEXT,
            allowNull:false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        thumbnail:{
            type:DataTypes.STRING
        }
    },
    {
        sequelize,
        timestamps:true,
        modelName:'course',
        freezeTableName: true,
        paranoid:true,
    }
);

export default Course;