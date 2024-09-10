import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../config/postgres.js';

class CourseCategory extends Model { }

CourseCategory.init(
    {
        courseId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'course',
                key: 'id',
            },
        },
        categoryId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'category',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        modelName: 'course_category',
        freezeTableName: true,
    },
);

export default CourseCategory;