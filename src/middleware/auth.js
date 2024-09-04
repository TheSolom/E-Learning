import { verifyToken, blockToken } from '../modules/auth/token.service.js';
import redis from "../config/redis.js";
import errorHandler from '../utils/error-handler.js';

export async function isAuthenticated(req, _res, next) {
    const accessToken = req.cookies["accessToken"] ?? req.headers["authorization"]?.split(' ')[1];
    if (!accessToken) {
        throw new errorHandler('Please register or login to continue', 401);
    }

    const token = verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET);
    if (!token) {
        await blockToken(token);
        throw new errorHandler('Token invalid, Please login again', 401);
    }

    const { exp: decodedExp, user: decodedUser } = token;

    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedExp <= currentTime) {
        throw new errorHandler('Token expired, Please login again', 401);
    }

    const user = await redis.get(`user:${decodedUser.id}`);
    req.user = user;

    next();
};

export function authorizeRoles(...roles) {
    return function (req, _res, next) {
        if (!roles.includes(req.user.role)) {
            throw new errorHandler('Access restricted, insufficient permissions', 403);
        }
        next();
    };
};