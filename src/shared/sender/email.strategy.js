import { sendVerificationEmail, sendResetPasswordEmail } from './email.service.js';
import VerificationPurpose from '../../modules/verification/domain/verification-purpose.enum.js';
import ErrorHandler from "../utils/error.handler.js";

class EmailStrategy {
    async sendEmail(email, otp) {
        throw new ErrorHandler('sendEmail method must be implemented', 500, null, true);
    }
}

class VerificationEmailStrategy extends EmailStrategy {
    async sendEmail(email, otp) {
        return await sendVerificationEmail(email, otp);
    }
}

class ResetPasswordEmailStrategy extends EmailStrategy {
    async sendEmail(email, otp) {
        return await sendResetPasswordEmail(email, otp);
    }
}

export class EmailStrategyContext {
    constructor(purpose) {
        switch (purpose) {
            case VerificationPurpose.EMAIL_VERIFICATION:
                this.strategy = new VerificationEmailStrategy();
                break;
            case VerificationPurpose.PASSWORD_RESET:
                this.strategy = new ResetPasswordEmailStrategy();
                break;
            default:
                throw new ErrorHandler('Invalid email purpose', 400);
        }
    }

    sendEmail(email, otp) {
        return this.strategy.sendEmail(email, otp);
    }
}
