class errorHandler extends Error {
    constructor(message, statusCode, cause) {
        super(message);

        this.name = this.constructor.name;
        this.statusCode = statusCode || 500;
        if (cause) {
            if (!Array.isArray(cause)) cause = [cause];
            this.cause = cause;
        }
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default errorHandler;