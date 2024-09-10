import User from './users.model.js';
import { get, set, remove } from '../../utils/cache.js';

export const updateUser = async (userId, userData) => {
    let user = await get(`user:${userId}`);
    if (!user) return null;

    const [, [userRow]] = await User.update(
        userData,
        {
            where: { id: userId },
            returning: true,
            individualHooks: true,
        }
    );
    if (!userRow) return null;

    const { password, ...userWithoutPassword } = userRow.dataValues;
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
