import { EmailVerificationHandler } from './email-verification.handler.js';
import { PasswordResetHandler } from './password-reset.handler.js';
import { VerificationPurpose } from './verification.enum.js';
import ErrorHandler from "../../../shared/utils/error.handler.js";

export class OTPFactory {
    static getOTPPurposeHandler(purpose) {
        switch (purpose) {
            case VerificationPurpose.EMAIL_VERIFICATION:
                return new EmailVerificationHandler();
            case VerificationPurpose.PASSWORD_RESET:
                return new PasswordResetHandler();
            default:
                throw new ErrorHandler('Invalid OTP purpose', 400);
        }
    }
}
