export function sendLoginTokens(req, res, _next) {
    const { ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN, NODE_ENV } = process.env;

    const accessTokenOptions = {
        expires: new Date(Date.now() + ACCESS_TOKEN_EXPIRES_IN * 1000),
        maxAge: ACCESS_TOKEN_EXPIRES_IN * 1000,
        httpOnly: true,
        sameSite: "lax",
        secure: (NODE_ENV === "production" ? true : false),
    };

    const refreshTokenOptions = {
        expires: new Date(Date.now() + REFRESH_TOKEN_EXPIRES_IN * 1000),
        maxAge: REFRESH_TOKEN_EXPIRES_IN * 1000,
        httpOnly: true,
        sameSite: "lax",
        secure: (NODE_ENV === "production" ? true : false),
    };

    const { accessToken, refreshToken } = req;

    res.cookie("accessToken", accessToken, accessTokenOptions);
    res.cookie("refreshToken", refreshToken, refreshTokenOptions);

    res.status(200).json({
        accessToken: {
            token: accessToken,
            expiresInSeconds: ACCESS_TOKEN_EXPIRES_IN,
        },
        refreshToken: {
            token: refreshToken,
            expiresInSeconds: REFRESH_TOKEN_EXPIRES_IN,
        },
    });
}