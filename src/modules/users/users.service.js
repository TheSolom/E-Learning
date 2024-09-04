import User from './users.model.js';
import { get, set } from '../../utils/cache.js';

export const updateUser = async (userId, userData) => {
    let user = await get(`user:${userId}`);
    if (!user) {
        return null;
    }

    const [, [userRow]] = await User.update(userData, { where: { id: userId }, returning: true, });
    if (!userRow) {
        return null;
    }

    const { password, ...userWithoutPassword } = userRow.dataValues;

    await set(`user:${userId}`, userWithoutPassword);

    return userWithoutPassword;
};
