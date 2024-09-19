import * as roleService from './role.service.js';
import { checkUserPassword } from "./user.service.js";

export async function getRole(req, res, _next) {
    const { params: { roleId } } = req;

    const role = await roleService.getRole(roleId);

    res.status(200).json(role);
}

export async function getRoles(_req, res, _next) {
    const rolesData = await roleService.getRoles();

    res.status(200).json({ data: rolesData });
}

export async function createRole(req, res, _next) {
    const { body: roleData } = req;

    const role = await roleService.createRole(roleData);

    res.status(201).json(role);
}

export async function updateRole(req, res, _next) {
    const { params: { roleId } } = req;
    const { body: roleData } = req;

    const role = await roleService.updateRole(roleId, roleData);

    res.status(200).json(role);
}

export async function deleteRole(req, res, _next) {
    const { user: { isSecure, id: userId } } = req;
    const { headers: { 'x-password': password } } = req;
    const { params: { roleId } } = req;

    if (!isSecure) {
        await checkUserPassword(userId, password);
    }

    await roleService.deleteRole(roleId);

    res.status(204).json();
}
