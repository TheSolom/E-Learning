import Joi from 'joi';

export const updateUserValidation = Joi.object({
    firstName: Joi.string()
        .trim()
        .min(1)
        .max(45)
        .regex(/^[A-Za-z]+$/)
        .messages({
            'string.base': 'First name must be a string',
            'string.min': 'First name must be between 1-45 characters long',
            'string.max': 'First name must be between 1-45 characters long',
            'string.pattern.base': 'First name must only contain letters',
        }),
    lastName: Joi.string()
        .trim()
        .min(1)
        .max(45)
        .regex(/^[A-Za-z]+$/)
        .messages({
            'string.base': 'Last name must be a string',
            'string.min': 'Last name must be between 1-45 characters long',
            'string.max': 'Last name must be between 1-45 characters long',
            'string.pattern.base': 'Last name must only contain letters',
        }),
    email: Joi.string()
        .forbidden()
        .messages({
            'any.unknown': 'Email cannot be changed',
        }),
    oldPassword: Joi.when('password', {
        is: Joi.exist(),
        then: Joi.string().required().messages({
            'any.required': 'Old password is required when setting a new password',
        }),
        otherwise: Joi.forbidden(),
    }),
    password: Joi.string()
        .trim()
        .min(8)
        .max(64)
        .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
        .messages({
            'string.base': 'Password must be a string',
            'string.min': 'Password must be 8 to 64 characters long',
            'string.max': 'Password must be 8 to 64 characters long',
            'string.pattern.base': 'Password must contain at least one letter, one number and one special character',
        }),
    confirmPassword: Joi.when('password', {
        is: Joi.exist(),
        then: Joi.string()
            .valid(Joi.ref('password'))
            .required()
            .messages({
                'any.required': 'Confirm password is required',
                'string.base': 'Confirm password must be a string',
                'any.only': 'Password does not match with the confirm password',
            }),
        otherwise: Joi.forbidden(),
    }),
});

export const deleteUserValidation = Joi.object({
    id: Joi.number()
        .required()
        .positive()
        .messages({
            'any.required': "User's id is required",
            'number.base': "User's id must be a number",
            'number.positive': "User's id must be a positive number",
        }),
    password: Joi.string()
        .required()
        .trim()
        .messages({
            'any.required': 'Password is required',
            'string.base': 'Password must be a string',
            'string.empty': 'You must type a password',
        }),
});