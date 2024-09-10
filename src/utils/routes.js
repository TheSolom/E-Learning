import errorHandler from './error-handler.js';
import authRoutes from '../modules/auth/auth.routes.js';
import verificationRoutes from '../modules/verification/verification.routes.js';
import userRoutes from '../modules/users/users.routes.js';

const setupRoutes = (app, prefix = '') => {
    app.get([prefix, '/', '/api', '/api/v1'], (_req, res, _next) => {
        res.status(418).json({
            message: 'Welcome to E-Learning API V1',
            repo: 'https://github.com/TheSolom/E-Learning',
        });
    });

    app.use(`${prefix}/auth`, authRoutes);
    app.use(`${prefix}/verification`, verificationRoutes);
    app.use(`${prefix}/users`, userRoutes);

    app.all('*', (req, _res, next) => {
        next(new errorHandler(`Route not found`, 400, `${req.method} ${req.url}`));
    });
};

export default setupRoutes;