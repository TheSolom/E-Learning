import { Router } from 'express';

import {
    getUser,
    getUsers,
    updateUser,
    deleteUser,
} from './user.controller.js';
import {
    getUserParamsValidation,
    getUsersQueryValidation,
    updateUserParamsValidation,
    updateUserBodyValidation,
    deleteUserHeadersValidation,
    deleteUserParamsValidation,
} from '../domain/user.validation.js';
import validateRequest from '../../../shared/middleware/validation.js';
import { isAuthenticated, isSameUserOrAdmin } from '../../../shared/middleware/auth.js';
import { uploadSingleFile } from '../../../shared/middleware/media-upload.js';

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
    uploadSingleFile('photo'),
    updateUser
);

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
