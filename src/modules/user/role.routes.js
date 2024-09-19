import { Router } from "express";

import {
    getRole,
    getRoles,
    createRole,
    updateRole,
    deleteRole
} from "./role.controller.js";
import {
    getRoleParamsValidation,
    createRoleBodyValidation,
    updateRoleParamsValidation,
    updateRoleBodyValidation,
    deleteRoleHeadersValidation,
    deleteRoleParamsValidation
} from "./role.validation.js";
import validateRequest from "../../middleware/validation.js";
import { isAuthenticated, authorizeRoles } from "../../middleware/auth.js";
import Role from "./role.enum.js";

const router = Router();

router.get('/:roleId',
    isAuthenticated,
    authorizeRoles(Role.ADMIN, Role.SUPER_ADMIN),
    validateRequest({ params: getRoleParamsValidation }),
    getRole
);

router.get('/', isAuthenticated, authorizeRoles(Role.ADMIN, Role.SUPER_ADMIN), getRoles);

router.post('/',
    isAuthenticated,
    authorizeRoles(Role.SUPER_ADMIN),
    validateRequest({ body: createRoleBodyValidation }),
    createRole
);

router.patch('/:roleId',
    isAuthenticated,
    authorizeRoles(Role.SUPER_ADMIN),
    validateRequest({
        params: updateRoleParamsValidation,
        body: updateRoleBodyValidation
    }),
    updateRole
);

router.delete('/:roleId',
    isAuthenticated,
    authorizeRoles(Role.SUPER_ADMIN),
    validateRequest({
        headers: deleteRoleHeadersValidation,
        params: deleteRoleParamsValidation
    }),
    deleteRole
);

export default router;
