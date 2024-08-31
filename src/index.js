import express from 'express';
import "express-async-errors";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

import errorMiddleware from './middleware/error.js';
import errorHandler from './utils/error-handler.js';
import authRoutes from './modules/auth/auth.routes.js';
import verificationRoutes from './modules/auth/verification.routes.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(compression());

if (process.env.NODE_ENV !== "production")
    app.use(morgan("dev"));
else
    app.use(morgan("combined"));

app.get(['/', '/api', '/api/v1'], (_req, res) => {
    res.status(418).json({
        message: 'Welcome to E-Learning API V1',
        repo: 'https://github.com/TheSolom/E-Learning',
    });
});

app.use('/api/v1/auth', authRoutes, verificationRoutes);

app.all('*', (req, _res, next) => {
    next(new errorHandler(`Route not found`, 400, `${req.method} ${req.url}`));
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '127.0.0.1');
