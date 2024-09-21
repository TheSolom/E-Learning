import { Router } from "express";

import {
    getLanguage,
    getLanguages,
    createLanguage,
    deleteLanguage
} from "./language.controller.js";
import {
    getLanguageParamsValidation,
    createLanguageBodyValidation,
    deleteLanguageHeadersValidation,
    deleteLanguageParamsValidation
} from "../domain/language.validation.js";
import validateRequest from "../../../shared/middleware/validation.js";
import { isAuthenticated, authorizeRoles } from "../../../shared/middleware/auth.js";
import Role from "../../user/domain/role.enum.js";

const router = Router();

router.get('/:languageId',
    isAuthenticated,
    validateRequest({ params: getLanguageParamsValidation }),
    getLanguage
);

router.get('/', isAuthenticated, authorizeRoles(Role.ADMIN, Role.SUPER_ADMIN), getLanguages);

router.post('/',
    isAuthenticated,
    authorizeRoles(Role.SUPER_ADMIN),
    validateRequest({ body: createLanguageBodyValidation }),
    createLanguage
);

router.delete('/:languageId',
    isAuthenticated,
    authorizeRoles(Role.SUPER_ADMIN),
    validateRequest({
        headers: deleteLanguageHeadersValidation,
        params: deleteLanguageParamsValidation
    }),
    deleteLanguage
);

export default router;
