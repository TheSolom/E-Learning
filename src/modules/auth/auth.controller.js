import * as authService from "./auth.service.js";
import { createLoginTokens, validateRefreshToken } from './token.service.js';
import { set } from '../../utils/cache.js';

export async function register(req, _res, next) {
    const { body: userData } = req;

    const userWithoutPassword = await authService.registerUser(userData);
    req.user = userWithoutPassword;

    next();
}

export async function login(req, res, next) {
    const { body: userCredentials } = req;

    const userWithoutPassword = await authService.loginUser(userCredentials);

    if (!userWithoutPassword.isVerified) {
        return res.status(403).json({
            message: "User not verified. Please check your email",
            user: userWithoutPassword
        });
    }

    const { id, email, isVerified, roleId } = userWithoutPassword;

    const [{ accessToken: newAccessToken, refreshToken: newRefreshToken }] = await Promise.all([
        createLoginTokens(
            {
                user: {
                    id,
                    email,
                    isVerified,
                    roleId
                },
                isSecure: true
            },
        ),
        set(`user:${userWithoutPassword.id}`, JSON.stringify(userWithoutPassword)),
    ]);

    req.accessToken = newAccessToken;
    req.refreshToken = newRefreshToken;

    next();
}

export async function refreshLogin(req, res, next) {
    const { refreshToken } = req.cookies ?? req.body;
    if (!refreshToken) {
        return res.status(401).json({
            message: 'Token invalid, please login again',
        });
    }

    const { user: decodedUser } = await validateRefreshToken(refreshToken);

    const { id, email, isVerified, roleId } = decodedUser;

    const {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
    } = await createLoginTokens(
        {
            user: {
                id,
                email,
                isVerified,
                roleId
            },
            isSecure: false,
        },
    );

    req.accessToken = newAccessToken;
    req.refreshToken = newRefreshToken;

    next();
}