import { Router } from "express";

import {
    getUserRoles,
    getAllUsersRoles,
    addUserRole,
    deleteUserRole
} from "./user-role.controller.js";
import {
    getUserRolesParamsValidation,
    getAllUsersRolesQueryValidation,
    addUserRoleHeadersValidation,
    addUserRoleParamsValidation,
    addUserRoleBodyValidation,
    deleteUserRoleHeadersValidation,
    deleteUserRoleParamsValidation
} from "../domain/user-role.validation.js";
import validateRequest from "../../../shared/middleware/validation.js";
import { isAuthenticated, authorizeRoles } from "../../../shared/middleware/auth.js";
import Role from "../domain/role.enum.js";

const router = Router();

router.get('/:userId/roles',
    isAuthenticated,
    authorizeRoles(Role.ADMIN, Role.SUPER_ADMIN),
    validateRequest({ params: getUserRolesParamsValidation }),
    getUserRoles
);

router.get('/roles',
    isAuthenticated,
    authorizeRoles(Role.ADMIN, Role.SUPER_ADMIN),
    validateRequest({ query: getAllUsersRolesQueryValidation }),
    getAllUsersRoles
);

router.post('/:userId/roles',
    isAuthenticated,
    authorizeRoles(Role.SUPER_ADMIN),
    validateRequest({
        headers: addUserRoleHeadersValidation,
        params: addUserRoleParamsValidation,
        body: addUserRoleBodyValidation
    }),
    addUserRole
);

router.delete('/:userId/roles/:roleId',
    isAuthenticated,
    authorizeRoles(Role.SUPER_ADMIN),
    validateRequest({
        headers: deleteUserRoleHeadersValidation,
        params: deleteUserRoleParamsValidation
    }),
    deleteUserRole
);

export default router;
