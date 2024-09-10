import { Model, DataTypes } from "sequelize";
import { sequelize } from '../../config/postgres'

class Category extends Model {}

Category.init({
    id: {
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name: {
        type:DataTypes.STRING,
        allowNull:false
    },
    description: {
        type:DataTypes.TEXT,
    }
},{
    sequelize,
    modelName:'category',
    freezeTableName: true,
    paranoid:true,
}

)