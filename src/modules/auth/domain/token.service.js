import jwt from 'jsonwebtoken';
import Token from '../data-access/token.model.js';
import ErrorHandler from '../../../shared/utils/error.handler.js';

export const verifyToken = (token, secretKey) => {
    return jwt.verify(token, secretKey, (err, decoded) => {
        if (err)
            throw new ErrorHandler('Invalid token', 401);
        return decoded;
    });
};

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
        if (error.name === 'SequelizeUniqueConstraintError') return;
    }

    return { accessToken, refreshToken };
};

export const getToken = async (token) => {
    const tokenRow = await Token.findOne({ where: { token } });
    if (!tokenRow) {
        throw new ErrorHandler('Invalid token', 401);
    }

    return tokenRow.dataValues;
};

export const blockToken = async (token) => {
    const [, [tokenRow]] = await Token.update({ blocked: true }, { where: { token }, returning: true });
    if (!tokenRow) {
        throw new ErrorHandler('Invalid token', 401);
    }

    return tokenRow.dataValues;
};

export const validateRefreshToken = async (refreshToken) => {
    const decodedToken = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const storedToken = await getToken(refreshToken);
    if (storedToken.blocked) {
        throw new ErrorHandler('Invalid token', 401);
    }
    if (!decodedToken.user || storedToken.userId !== decodedToken.user.id) {
        await blockToken(refreshToken);
        throw new ErrorHandler('Invalid token', 401);
    }

    return decodedToken;
};
