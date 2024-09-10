import { Router } from 'express';

import {
    registerValidation,
    loginValidation,
    forgotPasswordValidation,
    resetPasswordValidation,
} from './auth.validation.js';
import {
    register,
    login,
    refreshLogin,
    logout,
    forgotPassword,
    resetPassword,
} from './auth.controller.js';
import validateRequest from '../../middleware/validation.js';
import { sendLoginTokens } from "./token.controller.js";

const router = Router();

router.post('/register', validateRequest(registerValidation), register);

router.post('/login', validateRequest(loginValidation), login, sendLoginTokens);

router.post('/refresh', refreshLogin, sendLoginTokens);

router.post('/logout', logout);

router.post('/forgot-password', validateRequest(forgotPasswordValidation), forgotPassword);

router.patch('/reset-password', validateRequest(resetPasswordValidation), resetPassword);

export default router;
