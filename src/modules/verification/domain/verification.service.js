import { randomInt } from 'node:crypto';
import OTP from '../data-access/otp.model.js';
import ErrorHandler from '../../../shared/utils/error.handler.js';
import convertUtcToLocal from '../../../shared/utils/utc-to-local.js';

export const checkOTPCoolDown = async (userId, purpose) => {
    const COOL_DOWN_PERIOD = 90 * 1000; // 1 minute and 30 seconds in milliseconds

    const otpRow = await OTP.findOne({ where: { userId, purpose }, order: [['createdAt', 'DESC']] });

    if (
        otpRow &&
        Date.now() - otpRow.dataValues.createdAt < COOL_DOWN_PERIOD
    ) {
        const timeRemaining = Math.ceil((COOL_DOWN_PERIOD - (Date.now() - otpRow.dataValues.createdAt)) / 1000);
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        const remainingTimeString = minutes > 0 ? `${minutes}min ${seconds}s` : `${seconds}s`;

        throw new ErrorHandler(`Please wait for ${remainingTimeString} before requesting a new OTP`, 429);
    }
};

function generateOTP(length = 6) {
    const min = 10 ** (length - 1);
    const max = (10 ** length) - 1;

    return randomInt(min, max);
}

export const createOTP = async (userId, purpose) => {
    const otp = generateOTP(6);

    await OTP.create({ otp, userId, purpose });

    return otp;
};

export const verifyOTP = async (userId, otp, purpose) => {
    const otpRow = await OTP.findOne({ where: { userId, purpose }, order: [['createdAt', 'DESC']] });

    if (!otpRow || otpRow.dataValues.otp !== otp) {
        throw new ErrorHandler('Invalid OTP', 400);
    }

    const otpExp = new Date(otpRow.dataValues.expiryDateTime + ' UTC');
    const currentTimeStamp = convertUtcToLocal(new Date(Date.now()));

    if (otpExp < currentTimeStamp) {
        throw new ErrorHandler('Expired OTP ', 400);
    }

    return {
        isValid: true
    };
};

export const removeOTP = async (userId, otp, purpose) => {
    await OTP.destroy({ where: { userId, otp, purpose } });
};