import * as userService from './users.service.js';
import User from './users.model.js';
import { getOrSet } from '../../utils/cache.js';

export async function getUser(req, res, _next) {
    const { userId } = req.params;

    try {
        const user = await getOrSet(
            `user:${userId}`,
            async () => {
                const userRow = await User.findByPk(userId, { attributes: { exclude: ['password'] } });
                if (!userRow) throw new Error;
                return user.dataValues;
            }
        );

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ user });
    } catch {
        throw new Error;
    }
}

export async function updateUser(req, res, _next) {
    const { userId } = req.params;
    const { body: userData } = req;

    const user = await userService.updateUser(userId, userData);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
}
