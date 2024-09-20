import { Router } from 'express';

import {
    registerValidation,
    loginValidation,
    forgotPasswordValidation,
    resetPasswordValidation,
} from '../domain/auth.validation.js';
import {
    register,
    login,
    refreshLogin,
    logout,
    forgotPassword,
    resetPassword,
} from '../domain/auth.controller.js';
import validateRequest from '../../../shared/middleware/validation.js';
import { sendOTP } from '../../verification/api/verification.controller.js';
import { setLoginTokens } from "../domain/token.controller.js";

const router = Router();

router.post('/register', validateRequest({ body: registerValidation }), register, sendOTP);

router.post('/login', validateRequest({ body: loginValidation }), login, setLoginTokens);

router.post('/refresh', refreshLogin, setLoginTokens);

router.post('/logout', logout);

router.post('/forgot-password', validateRequest({ body: forgotPasswordValidation }), forgotPassword, sendOTP);

router.patch('/reset-password', validateRequest({ body: resetPasswordValidation }), resetPassword);

export default router;
