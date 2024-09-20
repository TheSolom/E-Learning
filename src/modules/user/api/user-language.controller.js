import * as userLanguageService from '../user-language.service.js';

export async function getUserLanguages(req, res, _next) {
    const { params: { userId } } = req;

    const languages = await userLanguageService.getUserLanguages(userId);

    res.status(200).json({ data: languages });
}

export async function addUserLanguage(req, res, _next) {
    const { params: { userId } } = req;
    const { body: { languageId } } = req;

    const language = await userLanguageService.addUserLanguage(userId, languageId);

    res.status(201).json(language);
}

export async function deleteUserLanguage(req, res, _next) {
    const { params: { userId, languageId } } = req;

    await userLanguageService.deleteUserLanguage(userId, languageId);

    res.status(204).json();
}
