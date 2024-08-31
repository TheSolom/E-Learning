import { verifyToken } from '../modules/auth/token.service.js';
import redis from "../config/redis.js";
import errorHandler from '../utils/error-handler.js';

export async function isAuthenticated(req, _res, next) {
    let accessToken = req.headers["authorization"].split(' ')[1] || req.cookies["accessToken"];

    if (!accessToken)
        throw new errorHandler('You are not login, Please login to get access', 401);

    const verifyTokenResult = verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET);

    const { userId, exp } = verifyTokenResult.decoded;

    // const currentTime = Math.floor(Date.now() / 1000);

    // // if (exp <= currentTime)
    // //     updateToken(accessToken, process.env.ACCESS_TOKEN_SECRET, process.env.REFRESH_TOKEN_SECRET);

    const user = await redis.get(userId);

    req.user = user;

    next();
};

export function authorizeRoles(...roles) {
    return function (req, _res, next) {
        if (!roles.includes(req.user.role)) {
            throw new errorHandler('You are not allowed to get access', 403);
        }
        next();
    };
};