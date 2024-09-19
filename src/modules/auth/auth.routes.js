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
import { sendOTP } from '../verification/verification.controller.js';
import { setLoginTokens } from "./token.controller.js";

const router = Router();

router.post('/register', validateRequest(registerValidation), register, sendOTP);

router.post('/login', validateRequest(loginValidation), login, setLoginTokens);

router.post('/refresh', refreshLogin, setLoginTokens);

router.post('/logout', logout);

router.post('/forgot-password', validateRequest(forgotPasswordValidation), forgotPassword, sendOTP);

router.patch('/reset-password', validateRequest(resetPasswordValidation), resetPassword);

export default router;
