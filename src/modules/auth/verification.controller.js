import * as verificationService from './verification.service.js';
import { VerificationPurpose } from './verification.enum.js';
import { sendVerificationEmail } from '../sender/email.service.js';
import errorHandler from '../../utils/error-handler.js';

export async function sendVerificationOTP(req, res, _next) {
    const { id: userId, email, firstName } = req.user ?? req.body;

    const { isCoolDown, remainingTime } = await verificationService.checkOTPCoolDown(userId, VerificationPurpose.EMAIL_VERIFICATION);

    if (isCoolDown) {
        return res.status(429).json({
            success: true,
            message: `Please wait ${remainingTime} before requesting a new OTP`,
        });
    }

    try {
        const createdOTP = await verificationService.createOTP(userId, VerificationPurpose.EMAIL_VERIFICATION);

        await sendVerificationEmail(email, firstName, createdOTP);
    } catch (error) {
        if (error.original.code === '23500') {
            throw new errorHandler('Invalid user id', 409);
        }
    }

    const responseMessage =
        req.user ?
            'User registered successfully, email verification OTP sent' :
            'Email verification OTP sent';

    res.status(201).json({
        success: true,
        message: responseMessage,
    });
};

// export function send2FA(req, res, next) { }

export async function verifyOTP(req, res, _next) {
    const { id: userId, otp, purpose } = req.body;

    const { isValid, cause } = await verificationService.verifyOTP(userId, otp, purpose);

    if (!isValid) {
        throw new errorHandler(cause, 400);
    }

    res.status(200).json({
        message: "OTP verified successfully",
    });
};
