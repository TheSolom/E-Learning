import User from '../../user/data-access/user.model.js';
import UserRole from '../../user/data-access/user-role.model.js';
import { getUser } from '../../user/domain/user.service.js';
import Role from '../../user/domain/role.enum.js';
import ErrorHandler from '../../../shared/utils/error.handler.js';

export const registerUser = async (userData) => {
    const { dataValues } = await User.create(userData, { returning: true });
    const { password: _, ...userWithoutPassword } = dataValues;

    await UserRole.create({ userId: userWithoutPassword.id, roleId: Role.STUDENT });

    return {
        ...userWithoutPassword,
        roles: [{ id: Role.STUDENT }]
    };
};

export const checkUserCredentials = async (userCredentials) => {
    const { email, password } = userCredentials;

    const user = await getUser({ email });

    if (!user || !(await user.comparePassword(password))) {
        throw new ErrorHandler('Incorrect email or password', 401);
    }

    const { dataValues: { password: _, ...userWithoutPassword } } = user;
    return userWithoutPassword;
};
