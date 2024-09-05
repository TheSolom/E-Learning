import { verifyToken } from '../modules/auth/token.service.js';
import redis from "../config/redis.js";
import errorHandler from '../utils/error-handler.js';

export async function isAuthenticated(req, _res, next) {
    const accessToken = req.cookies["accessToken"] ?? req.headers["authorization"]?.split(' ')[1];
    if (!accessToken) {
        throw new errorHandler('Please register or login to continue', 401);
    }

    const token = verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET);
    if (!token) {
        throw new errorHandler('Token invalid, Please login again', 401);
    }

    const { user: decodedUser } = token;
    const user = await redis.get(`user:${decodedUser.id}`);
    req.user = user;

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