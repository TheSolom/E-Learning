import errorHandler from "../utils/error-handler.js";

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

const errorMiddleware = (error, _req, res, _next) => {
    error.statusCode = error.statusCode || 500;
    error.message = error.message || 'Internal server error';

    if (error?.original?.code === '23505') {
        error = new errorHandler('Duplicate value error', 400, error.original.detail);
    }
    if (error?.original?.code === '23500') {
        error = new errorHandler('Constraint violation error', 409, error.original.detail);
    }

    if (process.env.NODE_ENV === 'development') {
        sendErrorForDev(error, res);
    } else {
        sendErrorForProd(error, res);
    }
};

export default errorMiddleware;