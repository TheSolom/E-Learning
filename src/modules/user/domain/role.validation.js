import Joi from "joi";

export const getRoleParamsValidation = Joi.object({
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

export const createRoleBodyValidation = Joi.object({
    name: Joi.string()
        .required()
        .trim()
        .max(45)
        .messages({
            'any.required': "Role's name is required",
            'string.base': "Role's name must be a string",
            'string.empty': "Role's name must not be empty",
            'string.max': "Role's name must be less than or equal to 45 characters",
        }),
    order: Joi.number()
        .required()
        .integer()
        .positive()
        .messages({
            'any.required': "Role's order is required",
            'number.base': "Role's order must be a number",
            'number.integer': "Role's order must be an integer",
            'number.positive': "Role's order must be a positive number",
        }),
});

export const updateRoleParamsValidation = Joi.object({
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

export const updateRoleBodyValidation = Joi.object({
    name: Joi.string()
        .optional()
        .trim()
        .max(45)
        .messages({
            'any.required': "Role's name is required",
            'string.base': "Role's name must be a string",
            'string.empty': "Role's name must not be empty",
            'string.max': "Role's name must be less than or equal to 45 characters",
        }),
    order: Joi.number()
        .optional()
        .integer()
        .positive()
        .messages({
            'any.required': "Role's order is required",
            'number.base': "Role's order must be a number",
            'number.integer': "Role's order must be an integer",
            'number.positive': "Role's order must be a positive number",
        }),
}).min(1, 'Must have at least one field to update');

export const deleteRoleHeadersValidation = Joi.object({
    'x-password': Joi.string()
        .required()
        .messages({
            'any.required': "Password is required",
            'string.base': "Password must be a string",
            'string.empty': "Password must not be empty",
        }),
}).unknown(true);

export const deleteRoleParamsValidation = Joi.object({
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