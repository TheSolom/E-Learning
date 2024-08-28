const sendErrorForDev = (error, res) => {
    return res.status(error.statusCode).json({
        error: error,
        message: error.message,
        cause: error.cause,
        stack: error.stack,
    });
};

const sendErrorForProd = (error, res) => {
    return res.status(error.statusCode).json({
        message: error.message,
        cause: error.cause
    });
};

const errorMiddleware = (error, req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
        sendErrorForDev(error, res);
    } else {
        sendErrorForProd(error, res);
    }
};

export default errorMiddleware;