import Language from "../data-access/language.model.js";
import ErrorHandler from '../../../shared/utils/error.handler.js';

export const getLanguage = async (languageId) => {
    const language = await Language.findByPk(languageId);
    if (!language) {
        throw new ErrorHandler('Language not found', 404);
    }

    return language.dataValues;
};

export const getLanguages = async () => {
    const languages = await Language.findAll({ order: [['name', 'ASC']] });

    return languages.map(language => language.dataValues);
};

export const createLanguage = async (languageData) => {
    const { dataValues: language } = await Language.create(languageData);
    return language;
};

export const deleteLanguage = async (languageId) => {
    await Language.destroy({ where: { id: languageId } });
};
