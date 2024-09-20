import Joi from "joi";

export const getUserLanguagesParamsValidation = Joi.object({
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

export const addUserLanguageParamsValidation = Joi.object({
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

export const addUserLanguageBodyValidation = Joi.object({
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

export const deleteUserLanguageParamsValidation = Joi.object({
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
