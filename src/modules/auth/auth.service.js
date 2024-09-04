import User from '../users/users.model.js';
import errorHandler from '../../utils/error-handler.js';

export const registerUser = async (userData) => {
    const { dataValues } = await User.create(userData, { returning: true });

    const { password, ...userWithoutPassword } = dataValues;

    return userWithoutPassword;
};

const checkUserCredentials = async (userData) => {
    const { email, password } = userData;

    const user = await User.findOne({ where: { email } });
    if (!user) return null;

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) return null;

    return user.dataValues;
};

export const loginUser = async (userCredentials) => {
    const user = await checkUserCredentials(userCredentials);
    if (!user) {
        throw new errorHandler('Incorrect email or password', 401);
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
};
