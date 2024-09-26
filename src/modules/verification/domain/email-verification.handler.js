import { OTPPurposeHandler } from './otp-purpose.handler.js';
import * as verificationService from './verification.service.js';
import VerificationPurpose from './verification-purpose.enum.js';

export class EmailVerificationHandler extends OTPPurposeHandler {
    async checkCoolDown(userId) {
        return verificationService.checkOTPCoolDown(userId, VerificationPurpose.EMAIL_VERIFICATION);
    }

    async createOTP(userId) {
        return verificationService.createOTP(userId, VerificationPurpose.EMAIL_VERIFICATION);
    }

    async verifyOTP(userId, otp) {
        return verificationService.verifyOTP(userId, otp, VerificationPurpose.EMAIL_VERIFICATION);
    }

    async removeOTP(userId, otp) {
        return verificationService.removeOTP(userId, otp, VerificationPurpose.EMAIL_VERIFICATION);
    }
}
