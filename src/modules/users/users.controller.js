import * as userService from './users.service.js';

export async function getUser(req, res, _next) {
    const { userId } = req.params;

    const userWithoutPassword = await userService.getUser(userId);
    if (!userWithoutPassword) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user: userWithoutPassword });
}

export async function updateUser(req, res, _next) {
    const { userId } = req.params;
    const { body: userData } = req;

    const userWithoutPassword = await userService.updateUser(userId, userData);
    if (!userWithoutPassword) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user: userWithoutPassword });
}

export async function deleteUser(req, res, _next) {
    const { userId: deletedUserId } = req.params;
    const { body: { userId, password } } = req;

    const isDeleted = await userService.deleteUser(userId, password, deletedUserId);
    if (!isDeleted) {
        return res.status(400).json({ message: 'Password is incorrect' });
    }

    res.status(204).json();
}
