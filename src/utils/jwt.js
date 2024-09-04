import bcryptjs from 'bcryptjs';

export async function hashPassword(password) {
    const salt = await bcryptjs.genSalt();
    const hashedPassword = await bcryptjs.hash(password, salt);
    return hashedPassword;
}

export async function compareHashedPassword(password, hashedPassword) {
    return bcryptjs.compare(password, hashedPassword);
}
