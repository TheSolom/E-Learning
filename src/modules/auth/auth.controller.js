import * as authService from "./auth.service.js";
import { createLoginTokens, validateRefreshToken, verifyToken, blockToken } from './token.service.js';
import { getUser, updateUser } from '../user/user.service.js';
import ErrorHandler from "../../utils/error.handler.js";
import { set, remove } from '../../utils/cache.js';
import { VerificationPurpose } from '../verification/verification.enum.js';

export async function register(req, _res, next) {
    const { body: userData } = req;

    const { id: userId } = await authService.registerUser(userData);

    req.body = {
        userId,
        purpose: VerificationPurpose.EMAIL_VERIFICATION
    };

    next();
}

export async function login(req, res, next) {
    const { body: userCredentials } = req;

    const userWithoutPassword = await authService.checkUserCredentials(userCredentials);

    if (!userWithoutPassword.isVerified) {
        return res.status(403).json({
            message: "User not verified. please verify your email",
            user: {
                id: userWithoutPassword.id,
            }
        });
    }

    const { id, email, isVerified, roles } = userWithoutPassword;

    const [{
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
    }] =
        await Promise.all([
            createLoginTokens(
                {
                    user: {
                        id,
                        email,
                        isVerified,
                        roles,
                    },
                    isSecure: true
                },
            ),
            set(`user:${userWithoutPassword.id}`, userWithoutPassword),
        ]);

    req.body = {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
    };

    next();
}

export async function refreshLogin(req, _res, next) {
    const { refreshToken } = req.cookies ?? req.body;
    if (!refreshToken) {
        throw new ErrorHandler('Refresh token is required', 400);
    }

    const decodedToken = await validateRefreshToken(refreshToken);

    const { id, email, isVerified, roles } = decodedToken.user;

    const {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
    } = await createLoginTokens(
        {
            user: {
                id,
                email,
                isVerified,
                roles,
            },
            isSecure: false,
        },
    );

    req.body = {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
    };

    next();
}

export async function logout(req, res, _next) {
    const { refreshToken } = req.cookies ?? req.body;
    if (!refreshToken) {
        throw new ErrorHandler('Refresh token is required', 400);
    }

    const decodedToken = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    await Promise.all([
        blockToken(refreshToken),
        remove(`user:${decodedToken.user.id}`)
    ]);

    const cookieOptions = {
        httpOnly: true,
        sameSite: "lax",
        secure: (process.env.NODE_ENV === "production" ? true : false),
    };

    res
        .clearCookie('refreshToken', cookieOptions)
        .clearCookie('accessToken', cookieOptions)
        .status(200).json({
            message: 'Logged out successfully'
        });
}

export async function forgotPassword(req, _res, next) {
    const { body: { email } } = req;

    const user = await getUser({ email });

    req.body = {
        userId: user.id,
        email,
        purpose: VerificationPurpose.PASSWORD_RESET
    };

    next();
}

export async function resetPassword(req, res, _next) {
    const { body: { userId, password } } = req;

    await updateUser(userId, password);

    res.status(200).json({
        message: 'Password reset successfully'
    });
}
