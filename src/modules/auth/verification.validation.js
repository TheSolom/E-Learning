import Joi from 'joi';

export const sendOTPValidation = Joi.object({
    id: Joi.number()
        .required()
        .positive()
        .messages({
            'number.base': "Please enter the account's id",
            'number.positive': "User ID must be a positive number",
            'any.required': "Please enter the account's id",
        }),
    firstName: Joi.string()
        .required()
        .trim()
        .min(1)
        .max(45)
        .regex(/^[A-Za-z]+$/)
        .messages({
            'any.required': 'First name is required',
            'string.base': 'First name must be a string',
            'string.empty': 'First name is required',
            'string.min': 'First name must be between 1-45 characters long',
            'string.max': 'First name must be between 1-45 characters long',
            'string.pattern.base': 'First name must only contain letters',
        }),
    email: Joi.string()
        .required()
        .email()
        .normalize()
        .messages({
            'any.required': "Please enter the account's email address",
            'string.email': "Please enter the account's email address",
        }),
});

export const send2FAValidation = Joi.object({});

export const verifyOTPValidation = Joi.object({
    id: Joi.number()
        .positive()
        .required()
        .messages({
            'number.base': "Please enter the account's id",
            'number.positive': "User ID must be a positive number",
            'any.required': "Please enter the account's id",
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
    purpose: Joi.string()
        .required()
        .trim()
        .valid('email_verification', '2fa_verification')
        .messages({
            'any.required': 'Please enter the purpose of the OTP',
            'any.only': 'Invalid purpose',
        }),
});
