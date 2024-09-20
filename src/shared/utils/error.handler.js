class ErrorHandler extends Error {
    constructor(message, statusCode, cause) {
        super(message);

        this.name = this.constructor.name;
        this.statusCode = statusCode || 500;
        this.isOperational = true;
        if (cause) {
            if (!Array.isArray(cause)) cause = [cause];
            this.cause = cause;
        }

        Error.captureStackTrace(this, this.constructor);
    }
}

export default ErrorHandler;