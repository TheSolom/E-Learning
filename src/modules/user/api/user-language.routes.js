import { Router } from "express";

import {
    getUserLanguages,
    addUserLanguage,
    deleteUserLanguage
} from "./user-language.controller.js";
import {
    getUserLanguagesParamsValidation,
    addUserLanguageParamsValidation,
    addUserLanguageBodyValidation,
    deleteUserLanguageParamsValidation
} from "../domain/user-language.validation.js";
import validateRequest from "../../../shared/middleware/validation.js";
import { isAuthenticated, isSameUserOrAdmin } from "../../../shared/middleware/auth.js";

const router = Router();

router.get('/:userId/languages',
    isAuthenticated,
    validateRequest({ params: getUserLanguagesParamsValidation }),
    getUserLanguages
);

router.post('/:userId/languages',
    isAuthenticated,
    isSameUserOrAdmin,
    validateRequest({
        params: addUserLanguageParamsValidation,
        body: addUserLanguageBodyValidation
    }),
    addUserLanguage
);

router.delete('/:userId/languages/:languageId',
    isAuthenticated,
    isSameUserOrAdmin,
    validateRequest({
        params: deleteUserLanguageParamsValidation
    }),
    deleteUserLanguage
);

export default router;
