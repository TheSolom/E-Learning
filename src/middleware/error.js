import ErrorHandler from "../utils/error.handler.js";

const extractSequelizeForeignKey = (errorMessage) => {
    const start = errorMessage.indexOf('(') + 1;
    const end = errorMessage.indexOf(')', start);
    return errorMessage.substring(start, end);
};

const handleSequelizeErrors = (error) => {
    switch (error.name) {
        case 'SequelizeUniqueConstraintError':
        case 'SequelizeValidationError':
            return new ErrorHandler('Validation failed', 400, error.errors[0].message);
        case 'SequelizeForeignKeyConstraintError': {
            const foreignKey = extractSequelizeForeignKey(error.parent.detail);
            return new ErrorHandler('Validation failed', 409, `Invalid ${foreignKey}`);
        }
        default:
            return error;
    }
};
const sendError = (error, res, isProduction = false) => {
    const response = {
        message: error.message,
        ...(isProduction ? { cause: error.cause } : { error: { ...error, stack: error.stack } })
    };

    return res.status(error.statusCode).json(response);
};

const errorMiddleware = (error, _req, res, _next) => {
    error.statusCode = error.statusCode || 500;
    error.message = error.message || 'Internal server error';

    error = handleSequelizeErrors(error);

    const isProduction = process.env.NODE_ENV === 'production';
    sendError(error, res, isProduction);
};

export default errorMiddleware;
