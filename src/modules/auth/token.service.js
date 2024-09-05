import jwt from 'jsonwebtoken';
import Token from './token.model.js';
import errorHandler from '../../utils/error-handler.js';

export const createToken = (payload, secretKey, expiresIn) => {
    return jwt.sign(payload, secretKey, { expiresIn });
};

export const createLoginTokens = async (payload) => {
    const {
        ACCESS_TOKEN_SECRET,
        ACCESS_TOKEN_EXPIRES_IN, // In seconds
        REFRESH_TOKEN_SECRET,
        REFRESH_TOKEN_EXPIRES_IN // In seconds
    } = process.env;

    const accessToken = createToken(payload, ACCESS_TOKEN_SECRET, parseInt(ACCESS_TOKEN_EXPIRES_IN));
    delete payload.isSecure;
    const refreshToken = createToken(payload, REFRESH_TOKEN_SECRET, parseInt(REFRESH_TOKEN_EXPIRES_IN));

    const currentTimestampSeconds = Math.floor(Date.now() / 1000);
    const expiryTimestampSeconds = currentTimestampSeconds + parseInt(REFRESH_TOKEN_EXPIRES_IN);
    const expirationTimeStamp = new Date(expiryTimestampSeconds * 1000);

    try {
        await Token.create({ userId: payload.user.id, token: refreshToken, expiryDateTime: expirationTimeStamp });
    } catch (error) {
        if (error?.original.code === '23505') return;
    }

    return { accessToken, refreshToken };
};

export const validateRefreshToken = async (refreshToken) => {
    const token = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (!token) {
        await blockToken(token);
        throw new errorHandler('Token invalid, Please login again', 401);
    }

    const { exp: decodedExp, user: decodedUser } = token;

    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedExp <= currentTime) {
        throw new errorHandler('Token expired, Please login again', 401);
    }

    const storedToken = await getToken(refreshToken);
    if (!storedToken || storedToken.blocked) {
        throw new errorHandler('Token invalid, Please login again', 401);
    }
    if (storedToken.userId !== decodedUser.id) {
        await blockToken(token);
        throw new errorHandler('Token invalid, Please login again', 401);
    }

    return token;
};

export const verifyToken = (token, secretKey) => {
    return jwt.verify(token, secretKey, (err, decoded) => {
        if (err) return null;
        return decoded;
    });
};

export const getToken = async (token) => {
    const tokenRow = await Token.findOne({ token });
    if (!tokenRow)
        return null;

    return tokenRow.dataValues;
};

export const blockToken = async (token) => {
    const [, [tokenRow]] = await Token.update({ blocked: true }, { where: { token }, returning: true });
    if (!tokenRow) {
        return null;
    }

    return tokenRow.dataValues;
};