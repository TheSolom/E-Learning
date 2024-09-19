import Role from "./role.model.js";
import ErrorHandler from '../../utils/error.handler.js';

export const getRole = async (roleId) => {
    const role = await Role.findByPk(roleId);
    if (!role) {
        throw new ErrorHandler('Role not found', 404);
    }

    return role.dataValues;
};

export const getRoles = async () => {
    const roles = await Role.findAll({ order: [['sortOrder', 'DESC']] });

    return roles.map(role => role.dataValues);
};

export const createRole = async (roleData) => {
    const { dataValues: role } = await Role.create(roleData);
    return role;
};

export const updateRole = async (roleId, roleData) => {
    const [, [updatedRole]] = await Role.update(roleData, { where: { id: roleId }, returning: true });
    if (!updatedRole) {
        throw new ErrorHandler('Role not found', 404);
    }

    return updatedRole.dataValues;
};

export const deleteRole = async (roleId) => {
    await Role.destroy({ where: { id: roleId } });
};
