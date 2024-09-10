import { OTPFactory } from './otp.factory.js';
import { EmailStrategyContext } from '../sender/email.strategy.js';
import { VerificationPurpose } from './verification.enum.js';
import errorHandler from '../../utils/error-handler.js';
import { updateUser } from '../users/users.service.js';

export async function sendOTP(req, res, _next) {
    const { userId, email, purpose } = req.body;

    const otpHandler = OTPFactory.getOTPPurposeHandler(purpose);

    const { isCoolDown, remainingTime } = await otpHandler.checkCoolDown(userId);
    if (isCoolDown) {
        return res.status(429).json({
            message: `Please wait ${remainingTime} before requesting a new OTP`,
        });
    }

    try {
        const createdOTP = await otpHandler.createOTP(userId);

        const emailStrategy = new EmailStrategyContext(purpose);
        await emailStrategy.sendEmail(email, createdOTP);

    } catch (error) {
        if (error?.original.code === '23500') {
            throw new errorHandler('Invalid user id', 409);
        }
    }

    res.status(201).json({
        message: `OTP sent, please check your email and verify it`,
        purpose,
        user: {
            id: userId,
        }
    });
}

export async function verifyOTP(req, res, _next) {
    const { userId, otp, purpose } = req.body;

    const otpHandler = OTPFactory.getOTPPurposeHandler(purpose);

    const { isValid, cause } = await otpHandler.verifyOTP(userId, otp);
    if (!isValid) {
        throw new errorHandler(cause, 400);
    }

    await otpHandler.removeOTP(userId, otp);

    if (purpose === VerificationPurpose.EMAIL_VERIFICATION)
        await updateUser(userId, { isVerified: true });

    res.status(200).json({ message: 'OTP verified successfully' });
}
