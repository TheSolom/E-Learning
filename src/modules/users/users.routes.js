import { Router } from 'express';

import {
    getUser,
    updateUser,
    deleteUser,
} from './users.controller.js';
import {
    getUserParamsValidation,
    updateUserParamsValidation,
    updateUserBodyValidation,
    deleteUserParamsValidation,
    deleteUserBodyValidation,
} from './users.validation.js';
import validateRequest from '../../middleware/validation.js';
import { isAuthenticated, isSameUserOrAdmin } from '../../middleware/auth.js';

const router = Router();

router.get('/:userId/profile', validateRequest({ params: getUserParamsValidation }), getUser);

router.patch('/:userId/profile',
    isAuthenticated,
    isSameUserOrAdmin,
    validateRequest({
        params: updateUserParamsValidation,
        body: updateUserBodyValidation
    }),
    updateUser);

router.delete('/:userId',
    isAuthenticated,
    isSameUserOrAdmin,
    validateRequest({
        params: deleteUserParamsValidation,
        body: deleteUserBodyValidation
    }),
    deleteUser
);

export default router;
