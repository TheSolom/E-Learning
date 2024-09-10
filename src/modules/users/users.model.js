import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../config/postgres.js';
import errorHandler from '../../utils/error-handler.js';
import { hashPassword, compareHashedPassword } from '../../utils/jwt.js';

class User extends Model {
    getFullName() {
        return `${this.dataValues.firstName} ${this.dataValues.lastName}`;
    }

    async comparePassword(password) {
        return compareHashedPassword(password, this.dataValues.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(320),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(64),
        },
        photo: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        bio: {
            type: DataTypes.TEXT,
            defaultValue: null,
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'role',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        modelName: 'user',
        freezeTableName: true,
        timestamps: true,
        hooks: {
            beforeCreate: async (user) => {
                await checkEmailUniqueness(user);
                user.password = await hashPassword(user.password);
            },
            beforeUpdate: async (user) => {
                if (user.changed('email')) {
                    await checkEmailUniqueness(user);
                }
                if (user.changed('password')) {
                    user.password = await hashPassword(user.password);
                }
            },
        }
    },
);

async function checkEmailUniqueness(user) {
    const existingUser = await User.findOne({ where: { email: user.dataValues.email }, attributes: ['id'] });
    if (existingUser && existingUser.dataValues.id !== user.dataValues.id) {
        throw new errorHandler('Email already in use, please try another one', 422, user.email);
    }
}

export default User;