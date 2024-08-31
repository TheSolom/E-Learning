import { Router } from 'express';

import {
    registerValidation,
    // loginValidation,
    // forgotPasswordValidation,
    // resetPasswordValidation,
} from './auth.validation.js';
import {
    register,
    // login,
    // refreshLogin,
    // logout,
    // forgotPassword,
    // resetPassword,
} from './auth.controller.js';
import validateRequest from '../../middleware/validation.js';
import { sendVerificationOTP } from './verification.controller.js';

const router = Router();

router.post('/register', validateRequest(registerValidation), register, sendVerificationOTP);

// router.post('/login', validateRequest(loginValidation), login);

// router.get('/refresh-token', refreshLogin);

// router.post('/logout', logout);

// router.post('/forgot-password', validateRequest(forgotPasswordValidation), forgotPassword);

// router.patch('/reset-password/:token', validateRequest(resetPasswordValidation), resetPassword);

export default router;
