import { sendVerificationEmail, sendResetPasswordEmail } from './email.service.js';
import { VerificationPurpose } from '../verification/verification.enum.js';

class EmailStrategy {
    async sendEmail(email, otp) {
        throw new Error('sendEmail method must be implemented');
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
                throw new Error('Invalid email purpose');
        }
    }

    sendEmail(email, otp) {
        return this.strategy.sendEmail(email, otp);
    }
}
