import * as authService from "./auth.service.js";

export async function register(req, res, next) {
    const { body } = req;

    const user = await authService.registerUser(body);
    req.user = user;

    next();
}