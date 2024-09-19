import UserLanguage from './user-language.model.js';
import ErrorHandler from '../../utils/error.handler.js';

export const getUserLanguages = async (userId) => {
    const userLanguages = await UserLanguage.findAll({
        where: { userId },
        include: [{
            model: UserLanguage.sequelize.models.language,
            attributes: ['id', 'name'],
        }],
        attributes: ['createdAt'],
    });

    if (!userLanguages) {
        throw new ErrorHandler('User languages not found', 404);
    }

    return userLanguages.map(userLanguage => userLanguage.dataValues);
};

export const addUserLanguage = async (userId, languageId) => {
    try {
        const { dataValues: userLanguage } = await UserLanguage.create({ userId, languageId });
        return userLanguage;
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            throw new ErrorHandler('User already has this language', 409);
        }
        throw error;
    }
};

export const deleteUserLanguage = async (userId) => {
    await UserLanguage.destroy({ where: { userId } });
};
