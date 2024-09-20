import { OTPFactory } from '../domain/otp.factory.js';
import { EmailStrategyContext } from '../../../shared/sender/email.strategy.js';
import { VerificationPurpose } from '../domain/verification.enum.js';
import { getUser, updateUser } from '../../user/domain/user.service.js';

export async function sendOTP(req, res, _next) {
    const { body: { userId, purpose } } = req;

    const user = await getUser(userId);

    const otpHandler = OTPFactory.getOTPPurposeHandler(purpose);

    await otpHandler.checkCoolDown(userId);

    const createdOTP = await otpHandler.createOTP(userId);

    const emailStrategy = new EmailStrategyContext(purpose);
    await emailStrategy.sendEmail(user.email, createdOTP);

    res.status(201).json({
        message: `OTP sent, please check your email and verify it`,
        purpose,
        user: {
            id: userId,
        }
    });
}

export async function verifyOTP(req, res, _next) {
    const { body: { userId, purpose, otp } } = req;

    const otpHandler = OTPFactory.getOTPPurposeHandler(purpose);

    await otpHandler.verifyOTP(userId, otp);

    await Promise.all([
        otpHandler.removeOTP(userId, otp),
        purpose === VerificationPurpose.EMAIL_VERIFICATION ?
            updateUser(userId, { isVerified: true }) : Promise.resolve()
    ]);

    res.status(200).json({ message: 'OTP verified successfully' });
}
