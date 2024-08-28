import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

import errorMiddleware from './middlewares/error.middleware.js';
import errorHandler from './utils/error-handler.util.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

app.all('*', (req, _res, next) => {
    next(new errorHandler(`Not available route`, 400, `${req.method} ${req.url}`));
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '127.0.0.1', () => console.log(`Server listening on port ${PORT}`));
