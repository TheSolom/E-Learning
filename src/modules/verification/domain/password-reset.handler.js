import { OTPPurposeHandler } from './otp-purpose.handler.js';
import * as verificationService from './verification.service.js';
import VerificationPurpose from './verification-purpose.enum.js';

export class PasswordResetHandler extends OTPPurposeHandler {
    async checkCoolDown(userId) {
        return verificationService.checkOTPCoolDown(userId, VerificationPurpose.PASSWORD_RESET);
    }

    async createOTP(userId) {
        return verificationService.createOTP(userId, VerificationPurpose.PASSWORD_RESET);
    }

    async verifyOTP(userId, otp) {
        return verificationService.verifyOTP(userId, otp, VerificationPurpose.PASSWORD_RESET);
    }

    async removeOTP(userId, otp) {
        return verificationService.removeOTP(userId, otp, VerificationPurpose.PASSWORD_RESET);
    }
}
