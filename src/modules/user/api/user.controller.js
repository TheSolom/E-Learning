import * as userService from '../domain/user.service.js';
import { resizeProfileImage } from '../../../shared/utils/image-process.js';
import { uploadFiles } from '../../../shared/uploader/upload.service.js';

export async function getUser(req, res, _next) {
    const { params: { userId } } = req;

    const userWithoutPassword = await userService.getUser(userId);

    res.status(200).json({ user: userWithoutPassword });
}

export async function getUsers(req, res, _next) {
    const { query: findOptions } = req;

    const usersData = await userService.getUsers(findOptions);

    res.status(200).json(usersData);
}

export async function updateUser(req, res, _next) {
    const { params: { userId } } = req;
    const { body: userData } = req;
    const { file: photo } = req;

    if (photo) {
        const imageBuffer = await resizeProfileImage(photo.buffer);
        const [publicId] = await uploadFiles(imageBuffer, 'image', 'E-Learning/users');
        userData.photo = publicId;
    }

    const userWithoutPassword = await userService.updateUser(userId, userData);

    res.status(200).json({ user: userWithoutPassword });
}

export async function deleteUser(req, res, _next) {
    const { user: { id: requestingUserId } } = req;
    const { headers: { 'x-password': requestingUserPassword } } = req;
    const { params: { userId } } = req;

    await userService.checkUserPassword(requestingUserId, requestingUserPassword);

    await userService.deleteUser(userId);

    res.status(204).json();
}
