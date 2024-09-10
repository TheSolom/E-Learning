import { Router } from 'express';

import {
    sendOTPValidation,
    verifyOTPValidation,
} from './verification.validation.js';
import {
    sendOTP,
    verifyOTP
} from './verification.controller.js';
import validateRequest from '../../middleware/validation.js';

const router = Router();

router.post('/send-otp', validateRequest(sendOTPValidation), sendOTP);

router.post('/verify-otp', validateRequest(verifyOTPValidation), verifyOTP);

export default router;
