import * as authService from "./auth.service.js";
import { createLoginTokens, validateRefreshToken, verifyToken, blockToken } from './token.service.js';
import { findUser, updateUser } from '../users/users.service.js';
import { set, remove } from '../../utils/cache.js';
import { VerificationPurpose } from '../verification/verification.enum.js';
import { sendOTP } from '../verification/verification.controller.js';

export async function register(req, res, next) {
    const { body: userData } = req;

    const { id: userId, email } = await authService.registerUser(userData);

    req.body = { userId, email, purpose: VerificationPurpose.EMAIL_VERIFICATION };
    await sendOTP(req, res, next);
}

export async function login(req, res, next) {
    const { body: userCredentials } = req;

    const userWithoutPassword = await authService.loginUser(userCredentials);

    if (!userWithoutPassword.isVerified) {
        return res.status(403).json({
            message: "User not verified. please verify your email",
            user: {
                id: userWithoutPassword.id,
                email: userWithoutPassword.email
            }
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

export async function forgotPassword(req, res, next) {
    const { email } = req.body;

    const user = await findUser({ email });
    if (!user) {
        return res.status(404).json({
            message: 'User not found'
        });
    }

    req.body = { userId: user.id, email, purpose: VerificationPurpose.PASSWORD_RESET };
    await sendOTP(req, res, next);
}

export async function resetPassword(req, res, _next) {
    const { userId, password } = req.body;

    const userWithoutPassword = await updateUser(userId, password);
    if (!userWithoutPassword) {
        return res.status(404).json({
            message: 'User not found'
        });
    }

    res.status(200).json({
        message: 'Password reset successfully'
    });
}
