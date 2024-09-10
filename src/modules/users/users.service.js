import User from './users.model.js';
import { getOrSet, set, remove } from '../../utils/cache.js';

export const findUser = async (identifier) => {
    if (typeof identifier === 'string' || typeof identifier === 'number') {
        const userWithoutPassword = await getOrSet(
            `user:${identifier}`,
            async () => {
                const userRow = await User.findByPk(identifier, { attributes: { exclude: ['password'] } });
                return userRow?.dataValues;
            }
        );
        return userWithoutPassword;
    } else if (typeof identifier === 'object') {
        const user = await User.findOne({ where: identifier });
        return user?.dataValues;
    }

    return null;
};

export const updateUser = async (userId, userData) => {
    const user = await User.findByPk(userId);
    if (!user) return null;

    const { dataValues: { password, ...userWithoutPassword } } = await user.update(userData);

    await set(`user:${userId}`, userWithoutPassword);

    return userWithoutPassword;
};

export const deleteUser = async (userId, userPassword, deletedUserId) => {
    const user = await User.findByPk(userId);
    if (!user) return false;

    const isPasswordValid = await user.comparePassword(userPassword);
    if (!isPasswordValid) return false;

    if (userId === deletedUserId) {
        await user.destroy();
    } else {
        await User.destroy({ where: { id: deletedUserId } });
    }

    await remove(`user:${deletedUserId}`);

    return true;
};
