import { Op } from 'sequelize';
import UserRole from '../data-access/user-role.model.js';
import ErrorHandler from '../../../shared/utils/error.handler.js';

export const getUserRoles = async (userId) => {
    const userRoles = await UserRole.findAll({
        where: { userId },
        include: [{
            model: UserRole.sequelize.models.role,
            attributes: ['id', 'name', 'sortOrder'],
        }],
        attributes: ['createdAt'],
        order: [[UserRole.sequelize.col('role.sortOrder'), 'DESC']],
    });

    if (!userRoles) {
        throw new ErrorHandler('User roles not found', 404);
    }

    return userRoles.map(userRole => userRole.dataValues);
};

export const getAllUsersRoles = async (findOptions) => {
    const { page, limit, search, roleId, order, sort } = findOptions;

    const offset = (page - 1) * limit;

    const { rows: users, count: total } = await UserRole.findAndCountAll({
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
                    }
                ],
            }),
            ...(roleId && { roleId }),
        },
        attributes: ['createdAt'],
        include: [{
            model: UserRole.sequelize.models.user,
            required: true,
            attributes: ['id', 'firstName', 'lastName', 'email'],
        }, {
            model: UserRole.sequelize.models.role,
            required: true,
            attributes: ['id', 'name', 'sortOrder'],
        }],
        order: [[sort, order]],
        limit,
        offset,
    });

    return {
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        data: users.map((user) => user.dataValues)
    };
};

export const addUserRole = async (userId, roleId) => {
    try {
        const { dataValues: userRole } = await UserRole.create({ userId, roleId });
        return userRole;
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            throw new ErrorHandler('User already has this role', 409);
        }
        throw error;
    }
};

export const deleteUserRole = async (userId) => {
    await UserRole.destroy({ where: { userId } });
};
