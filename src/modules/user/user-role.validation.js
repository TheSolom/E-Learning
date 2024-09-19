import Joi from "joi";

export const getUserRolesParamsValidation = Joi.object({
    userId: Joi.number()
        .required()
        .integer()
        .positive()
        .messages({
            'any.required': "User's id is required",
            'number.base': "User's id must be a number",
            'number.integer': "User's id must be an integer",
            'number.positive': "User's id must be a positive number",
        }),
});

export const getAllUsersRolesQueryValidation = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    sort: Joi.string().valid('firstName', 'roleId', 'createdAt').default('createdAt'),
    order: Joi.string().valid('asc', 'desc').default('desc'),
    search: Joi.string().optional().trim(),
    roleId: Joi.string().optional().trim(),
});

export const addUserRoleHeadersValidation = Joi.object({
    "x-password": Joi.string()
        .required()
        .trim()
        .messages({
            'any.required': "Password is required",
            'string.base': "Password must be a string",
            'string.empty': "Password cannot be an empty field",
        }),
}).unknown(true);

export const addUserRoleParamsValidation = Joi.object({
    userId: Joi.number()
        .required()
        .integer()
        .positive()
        .messages({
            'any.required': "User's id is required",
            'number.base': "User's id must be a number",
            'number.integer': "User's id must be an integer",
            'number.positive': "User's id must be a positive number",
        }),
});

export const addUserRoleBodyValidation = Joi.object({
    roleId: Joi.number()
        .required()
        .integer()
        .positive()
        .messages({
            'any.required': "Role's id is required",
            'number.base': "Role's id must be a number",
            'number.integer': "Role's id must be an integer",
            'number.positive': "Role's id must be a positive number",
        }),
});

export const deleteUserRoleHeadersValidation = Joi.object({
    "x-password": Joi.string()
        .required()
        .trim()
        .messages({
            'any.required': "Password is required",
            'string.base': "Password must be a string",
            'string.empty': "Password cannot be an empty field",
        }),
}).unknown(true);

export const deleteUserRoleParamsValidation = Joi.object({
    userId: Joi.number()
        .required()
        .integer()
        .positive()
        .messages({
            'any.required': "User's id is required",
            'number.base': "User's id must be a number",
            'number.integer': "User's id must be an integer",
            'number.positive': "User's id must be a positive number",
        }),
    roleId: Joi.number()
        .required()
        .integer()
        .positive()
        .messages({
            'any.required': "Role's id is required",
            'number.base': "Role's id must be a number",
            'number.integer': "Role's id must be an integer",
            'number.positive': "Role's id must be a positive number",
        }),
});
