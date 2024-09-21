import * as languageService from '../domain/language.service.js';
import { checkUserPassword } from "../../user/domain/user.service.js";

export async function getLanguage(req, res, _next) {
    const { params: { languageId } } = req;

    const language = await languageService.getLanguage(languageId);

    res.status(200).json(language);
}

export async function getLanguages(_req, res, _next) {
    const languagesData = await languageService.getLanguages();

    res.status(200).json({ data: languagesData });
}

export async function createLanguage(req, res, _next) {
    const { body: languageData } = req;

    const language = await languageService.createLanguage(languageData);

    res.status(201).json(language);
}

export async function deleteLanguage(req, res, _next) {
    const { user: { isSecure, id: userId } } = req;
    const { headers: { 'x-password': password } } = req;
    const { params: { languageId } } = req;

    if (!isSecure) {
        await checkUserPassword(userId, password);
    }

    await languageService.deleteLanguage(languageId);

    res.status(204).json();
}
