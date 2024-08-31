import User from '../../modules/users/user.model.js';

export async function registerUser(userData) {
    const { dataValues } = await User.create(userData);

    const user = { ...dataValues };
    delete user.password;

    return user;
}
