import * as userRoleService from '../domain/user-role.service.js';
import { checkUserPassword } from "../domain/user.service.js";

export async function getUserRoles(req, res, _next) {
    const { params: { userId } } = req;

    const roles = await userRoleService.getUserRoles(userId);

    res.status(200).json({ data: roles });
}

export async function getAllUsersRoles(req, res, _next) {
    const { query: findOptions } = req;

    const rolesData = await userRoleService.getAllUsersRoles(findOptions);

    res.status(200).json(rolesData);
}

export async function addUserRole(req, res, _next) {
    const { user: { id: requestingUserId } } = req;
    const { headers: { 'x-password': requestingUserPassword } } = req;
    const { params: { userId } } = req;
    const { body: { roleId } } = req;

    await checkUserPassword(requestingUserId, requestingUserPassword);

    const role = await userRoleService.addUserRole(userId, roleId);

    res.status(201).json(role);
}

export async function deleteUserRole(req, res, _next) {
    const { user: { id: requestingUserId } } = req;
    const { headers: { 'x-password': requestingUserPassword } } = req;
    const { params: { userId, roleId } } = req;

    await checkUserPassword(requestingUserId, requestingUserPassword);

    await userRoleService.deleteUserRole(userId, roleId);

    res.status(204).json();
}
