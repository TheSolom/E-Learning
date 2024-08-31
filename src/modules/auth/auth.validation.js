import Joi from "joi";

export const registerValidation = Joi.object({
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
    lastName: Joi.string()
        .required()
        .trim()
        .min(1)
        .max(45)
        .regex(/^[A-Za-z]+$/)
        .messages({
            'any.required': 'Last name is required',
            'string.base': 'Last name must be a string',
            'string.empty': 'Last name is required',
            'string.min': 'Last name must be between 1-45 characters long',
            'string.max': 'Last name must be between 1-45 characters long',
            'string.pattern.base': 'Last name must only contain letters',
        }),
    email: Joi.string()
        .required()
        .email()
        .normalize()
        .messages({
            'any.required': 'Email is required',
            'string.email': 'Email must be a valid email',
        }),
    password: Joi.string()
        .required()
        .trim()
        .min(8)
        .max(64)
        .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
        .messages({
            'any.required': 'Password is required',
            'string.base': 'Password must be a string',
            'string.empty': 'You must type a password',
            'string.min': 'Password must be 8 to 64 characters long',
            'string.max': 'Password must be 8 to 64 characters long',
            'string.pattern.base': 'Password must contain at least one letter, one number and one special character',
        }),
    confirmPassword: Joi.any()
        .required()
        .valid(Joi.ref('password'))
        .messages({
            'any.required': 'Confirm password is required',
            'any.only': 'Password does not match with the confirm password'
        })
});
