import ErrorHandler from "../../../shared/utils/error.handler.js";

export class OTPPurposeHandler {
    async checkCoolDown(userId) {
        throw new ErrorHandler('checkCoolDown method must be implemented', 500, null, true);
    }

    async createOTP(userId) {
        throw new ErrorHandler('createOTP method must be implemented', 500, null, true);
    }

    async verifyOTP(userId, otp) {
        throw new ErrorHandler('verifyOTP method must be implemented', 500, null, true);
    }

    async removeOTP(userId, otp) {
        throw new ErrorHandler('removeOTP method must be implemented', 500, null, true);
    }
}
