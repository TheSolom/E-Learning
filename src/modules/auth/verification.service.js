import { randomInt } from 'node:crypto';
import OTP from './otp.model.js';
import convertUtcToLocal from '../../utils/utc-to-local.js';

export const checkOTPCoolDown = async (userId, purpose) => {
    const COOL_DOWN_PERIOD = 90 * 1000; // 1 minute and 30 seconds in milliseconds

    const otpRow = OTP.findOne({ where: { userId, purpose }, order: [['createdAt', 'DESC']] });

    if (
        otpRow &&
        Date.now() - otpRow.createdAt < COOL_DOWN_PERIOD
    ) {
        const timeRemaining = Math.ceil((COOL_DOWN_PERIOD - (Date.now() - otpRow.createdAt)) / 1000);
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        const remainingTimeString = minutes > 0 ? `${minutes}min ${seconds}s` : `${seconds}s`;

        return {
            isCoolDown: true,
            remainingTime: remainingTimeString,
        };
    }

    return {
        isCoolDown: false,
        remainingTime: null,
    };
};

function generateOTP(length = 6) {
    const min = 10 ** (length - 1);
    const max = (10 ** length) - 1;

    return randomInt(min, max);
}

export const createOTP = async (userId, purpose) => {
    const otp = generateOTP(6);

    await OTP.create({ otp, purpose, userId });

    return otp;
};

export const verifyOTP = async (userId, otp, purpose) => {
    const otpRow = await OTP.findOne({ where: { userId, otp, purpose }, order: [['createdAt', 'DESC']] });

    if (!otpRow) {
        return {
            isValid: false,
            cause: 'Invalid OTP'
        };
    }

    const otpExp = new Date(otpRow.expiryDateTime + ' UTC');
    const currentTimeStamp = convertUtcToLocal(new Date(Date.now()));

    if (otpExp < currentTimeStamp) {
        return {
            isValid: false,
            cause: 'OTP expired'
        };
    }

    return {
        isValid: true
    };
};

export const removeOTP = async (userId, otp, purpose) => {
    await OTP.destroy({ where: { userId, otp, purpose } });
}