import { Router } from 'express';

import {
    getUser,
    getUsers,
    updateUser,
    deleteUser,
} from './users.controller.js';
import {
    getUserParamsValidation,
    getUsersQueryValidation,
    updateUserParamsValidation,
    updateUserBodyValidation,
    deleteUserHeadersValidation,
    deleteUserParamsValidation,
} from './users.validation.js';
import validateRequest from '../../middleware/validation.js';
import { isAuthenticated, isSameUserOrAdmin } from '../../middleware/auth.js';

const router = Router();

router.get('/:userId/profile', validateRequest({ params: getUserParamsValidation }), getUser);

router.get('/', validateRequest({ query: getUsersQueryValidation }), getUsers);

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
        headers: deleteUserHeadersValidation,
        params: deleteUserParamsValidation,
    }),
    deleteUser
);

export default router;
