import Joi from 'joi';

export const sendOTPValidation = Joi.object({
    userId: Joi.number()
        .required()
        .positive()
        .messages({
            'number.base': "Please enter the user's id",
            'number.positive': "User ID must be a positive number",
            'any.required': "Please enter the user's id",
        }),
    purpose: Joi.string()
        .required()
        .trim()
        .valid('email_verification', 'password_reset')
        .messages({
            'any.required': 'Please enter the purpose of the OTP',
            'any.only': 'Invalid purpose',
        }),
});

export const verifyOTPValidation = Joi.object({
    userId: Joi.number()
        .positive()
        .required()
        .messages({
            'number.base': "Please enter the user's id",
            'number.positive': "User ID must be a positive number",
            'any.required': "Please enter the user's id",
        }),
    purpose: Joi.string()
        .required()
        .trim()
        .valid('email_verification', 'password_reset')
        .messages({
            'any.required': 'Please enter the purpose of the OTP',
            'any.only': 'Invalid purpose',
        }),
    otp: Joi.string()
        .required()
        .trim()
        .length(6)
        .regex(/^\d+$/)
        .messages({
            'string.length': 'OTP must be exactly 6 digits long',
            'string.pattern.base': 'Invalid OTP',
            'any.required': 'Invalid OTP',
        }),
});
