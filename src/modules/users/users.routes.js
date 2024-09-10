import { Router } from 'express';

import {
    getUser,
    updateUser,
    deleteUser,
} from './users.controller.js';
import {
    updateUserValidation,
    deleteUserValidation
} from './users.validation.js';
import validateRequest from '../../middleware/validation.js';
import { isAuthenticated, isSameUserOrAdmin } from '../../middleware/auth.js';

const router = Router();

router.get('/:userId/profile', getUser);

router.patch('/:userId/profile', isAuthenticated, isSameUserOrAdmin, validateRequest(updateUserValidation), updateUser);

router.delete('/:userId', isAuthenticated, isSameUserOrAdmin, validateRequest(deleteUserValidation), deleteUser);

export default router;
