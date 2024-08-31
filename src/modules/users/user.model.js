import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/postgres.js';
import errorHandler from '../../utils/error-handler.js';
import hashPassword from '../../utils/hash-password.js';

class User extends Model {
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
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
            allowNull: false,
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
        // roleId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: 'role',
        //         key: 'id',
        //     },
        // },
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
    const existingUser = await User.findOne({ where: { email: user.email } });
    if (existingUser && existingUser.id !== user.id) {
        throw new errorHandler('Email already in use, please try another one', 400, user.email);
    }
}

await User.sync({ alter: true });

export default User;