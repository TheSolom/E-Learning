import Joi from "joi";

export const getLanguageParamsValidation = Joi.object({
    languageId: Joi.number()
        .required()
        .integer()
        .positive()
        .messages({
            'any.required': "Language's id is required",
            'number.base': "Language's id must be a number",
            'number.integer': "Language's id must be an integer",
            'number.positive': "Language's id must be a positive number",
        }),
});

export const createLanguageBodyValidation = Joi.object({
    name: Joi.string()
        .required()
        .trim()
        .max(45)
        .messages({
            'any.required': "Language's name is required",
            'string.base': "Language's name must be a string",
            'string.empty': "Language's name must not be empty",
            'string.max': "Language's name must be less than or equal to 45 characters",
        }),
});

export const deleteLanguageHeadersValidation = Joi.object({
    'x-password': Joi.string()
        .required()
        .messages({
            'any.required': "Password is required",
            'string.base': "Password must be a string",
            'string.empty': "Password must not be empty",
        }),
}).unknown(true);

export const deleteLanguageParamsValidation = Joi.object({
    languageId: Joi.number()
        .required()
        .integer()
        .positive()
        .messages({
            'any.required': "Language's id is required",
            'number.base': "Language's id must be a number",
            'number.integer': "Language's id must be an integer",
            'number.positive': "Language's id must be a positive number",
        }),
});