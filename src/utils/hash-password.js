import bcryptjs from 'bcryptjs';

export default async function hashPassword(password) {
    const salt = await bcryptjs.genSalt();
    const hashedPassword = await bcryptjs.hash(password, salt);
    return hashedPassword;
}