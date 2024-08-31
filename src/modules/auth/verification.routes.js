import { Router } from 'express';

import {
    sendOTPValidation,
    // send2FAValidation,
    verifyOTPValidation,
} from './verification.validation.js';
import {
    sendVerificationOTP,
    // send2FA,
    verifyOTP
} from './verification.controller.js';
import validateRequest from '../../middleware/validation.js';

const router = Router();

router.post('/send-otp', validateRequest(sendOTPValidation), sendVerificationOTP);

// router.post('/send-2fa', validateRequest(send2FAValidation), send2FA);

router.post('/verify-otp', validateRequest(verifyOTPValidation), verifyOTP);

export default router;
