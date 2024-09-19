import { Op } from 'sequelize';
import User from './user.model.js';
import { getOrSet, set, remove } from '../../utils/cache.js';
import ErrorHandler from '../../utils/error.handler.js';

export const getUser = async (identifier) => {
    let user = null;

    if (typeof identifier === 'string' || typeof identifier === 'number') {
        user = await getOrSet(`user:${identifier}`,
            async () => {
                return (await User.findByPk(identifier, {
                    attributes: { exclude: ['password'] },
                    include: [{
                        model: User.sequelize.models.role,
                        attributes: ['id', 'sortOrder'],
                        through: {
                            model: User.sequelize.models.user_role,
                            attributes: []
                        },
                    }]
                }))?.dataValues;
            });
    } else if (typeof identifier === 'object') {
        user = await User.findOne({
            where: identifier,
            include: [{
                model: User.sequelize.models.role,
                attributes: ['id', 'sortOrder'],
                through: {
                    model: User.sequelize.models.user_role,
                    attributes: []
                },
            }]
        });
    }

    if (!user) {
        throw new ErrorHandler('User not found', 404);
    }

    return user;
};

export const getUsers = async (findOptions) => {
    const { page, limit, search, roleId, languageId, order, sort } = findOptions;

    const includeOptions = [{
        model: User.sequelize.models.role,
        required: true,
        attributes: ['id', 'name', 'sortOrder'],
        through: {
            model: User.sequelize.models.user_role,
            attributes: [],
            ...(roleId && { where: { roleId } }),
        },
    }, {
        model: User.sequelize.models.language,
        attributes: ['id', 'name'],
        through: {
            model: User.sequelize.models.user_language,
            attributes: [],
            ...(languageId && { where: { languageId } }),
        }
    }];

    const offset = (page - 1) * limit;

    const { rows: users, count: total } = await User.findAndCountAll({
        where: {
            ...(search && {
                [Op.or]: [
                    {
                        firstName: {
                            [Op.like]: `%${search}%`,
                        },
                    },
                    {
                        lastName: {
                            [Op.like]: `%${search}%`,
                        },
                    },
                    {
                        email: {
                            [Op.like]: `%${search}%`,
                        },
                    },
                ],
            }),
        },
        attributes: { exclude: ['password'] },
        include: includeOptions,
        order: [[sort, order]],
        limit,
        offset,
    });

    return {
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        data: users.map((user) => user.dataValues),
    };
};

export const updateUser = async (userId, userData) => {
    const user = await User.findByPk(userId);
    if (!user) {
        throw new ErrorHandler('User not found', 404);
    }

    const { dataValues: { password: _, ...userWithoutPassword } } = await user.update(userData);

    await set(`user:${userId}`, userWithoutPassword);

    return userWithoutPassword;
};

export const checkUserPassword = async (userId, userPassword) => {
    const user = await User.findByPk(userId);

    if (!user || !(await user.comparePassword(userPassword))) {
        throw new ErrorHandler('Invalid password', 401);
    }
};

export const deleteUser = async (deletedUserId) => {
    await User.destroy({ where: { id: deletedUserId } });

    await remove(`user:${deletedUserId}`);
};
