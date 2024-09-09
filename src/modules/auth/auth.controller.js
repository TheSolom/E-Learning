import * as authService from "./auth.service.js";
import { createLoginTokens, validateRefreshToken, verifyToken, blockToken } from './token.service.js';
import { set, remove } from '../../utils/cache.js';

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
        set(`user:${userWithoutPassword.id}`, userWithoutPassword),
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

    const decodedToken = await validateRefreshToken(refreshToken);
    if (!decodedToken)
        return res.status(401).json({
            message: 'Token invalid, please login again',
        });

    const { id, email, isVerified, roleId } = decodedToken.user;

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

export async function logout(req, res, _next) {
    const { refreshToken } = req.cookies ?? req.body;
    if (!refreshToken) {
        return res.status(401).json({
            message: 'Token invalid',
        });
    }

    const decodedToken = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (!decodedToken) {
        return res.status(401).json({
            message: 'Token invalid',
        });
    }

    await Promise.all([
        blockToken(refreshToken),
        remove(`user:${decodedToken.user.id}`)
    ]);

    const cookieOption = {
        httpOnly: true,
        sameSite: "lax",
        secure: (process.env.NODE_ENV === "production" ? true : false),
    };

    res
        .clearCookie('refreshToken', cookieOption)
        .clearCookie('accessToken', cookieOption)
        .status(200).json({
            message: 'Logged out successfully'
        });
}