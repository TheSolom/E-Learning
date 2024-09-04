import { Router } from 'express';

import {
    getUser,
    updateUser,
} from './users.controller.js';
import {
    updateUserValidation,
} from './users.validation.js';
import validateRequest from '../../middleware/validation.js';
import { isAuthenticated } from '../../middleware/auth.js';

const router = Router();

router.get('/:userId/profile', getUser);

router.patch('/:userId/profile', isAuthenticated, validateRequest(updateUserValidation), updateUser);

export default router;
