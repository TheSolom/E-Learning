import { verifyToken } from '../../modules/auth/domain/token.service.js';
import ErrorHandler from '../utils/error.handler.js';
import { get } from '../utils/cache.js';
import Role from '../../modules/user/domain/role.enum.js';

export async function isAuthenticated(req, _res, next) {
    const accessToken = req.cookies["accessToken"] ?? req.headers["authorization"]?.split(' ')[1];
    if (!accessToken) {
        throw new ErrorHandler('Please login to continue', 401);
    }

    const { user: decodedUser, isSecure } = verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET);

    const user = await get(`user:${decodedUser.id}`);

    req.user = { ...user, isSecure };

    next();
};

export function authorizeRoles(...rolesIds) {
    return function (req, _res, next) {
        if (!req?.user.roles.some(role => rolesIds.includes(role.id))) {
            throw new ErrorHandler('Access restricted, insufficient permissions', 403);
        }

        next();
    };
};

export function isSameUserOrAdmin(req, _res, next) {
    const { params: { userId } } = req;
    if (!userId) {
        throw new ErrorHandler('User ID is required', 400);
    }

    if (parseInt(userId) !== req?.user.id) {
        return authorizeRoles(Role.ADMIN, Role.SUPER_ADMIN)(req, _res, next);
    }

    next();
}
