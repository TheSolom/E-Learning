import { verifyToken } from '../modules/auth/token.service.js';
import redis from "../config/redis.js";
import errorHandler from '../utils/error-handler.js';
import roles from '../modules/users/roles.enum.js';

export async function isAuthenticated(req, _res, next) {
    const accessToken = req.cookies["accessToken"] ?? req.headers["authorization"]?.split(' ')[1];
    if (!accessToken) {
        throw new errorHandler('Please register or login to continue', 401);
    }

    const token = verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET);
    if (!token) {
        throw new errorHandler('Token invalid, Please login again', 401);
    }

    const { user: decodedUser, isSecure } = token;
    const user = await redis.get(`user:${decodedUser.id}`);
    req.user = { ...user, isSecure };

    next();
};

export function authorizeRoles(...rolesIds) {
    return function (req, _res, next) {
        if (!rolesIds.includes(req.user.roleId)) {
            throw new errorHandler('Access restricted, insufficient permissions', 403);
        }
        next();
    };
};

export function isSameUserOrAdmin(req, _res, next) {
    const { userId } = req.params;
    if (!userId) {
        throw new errorHandler('User ID is required', 400);
    }
    if (
        userId !== req?.user.id &&
        (
            req.user.roleId !== roles.ADMIN ||
            req.user.roleId === roles.SUPER_ADMIN
        )
    ) {
        throw new errorHandler('Access restricted, insufficient permissions', 403);
    }

    next();
}
