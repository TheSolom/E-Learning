import errorHandler from "../utils/error-handler.js";

function validateRequest(schema) {
    return (req, _res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            throw new errorHandler(
                'Validation failed',
                422,
                error.details.map((detail) => detail.message)
            );
        }

        next();
    };
};

export default validateRequest;
