export class OTPPurposeHandler {
    async checkCoolDown(userId) {
        throw new Error('checkCoolDown method must be implemented');
    }

    async createOTP(userId) {
        throw new Error('createOTP method must be implemented');
    }

    async verifyOTP(userId, otp) {
        throw new Error('verifyOTP method must be implemented');
    }

    async removeOTP(userId, otp) {
        throw new Error('removeOTP method must be implemented');
    }
}
