import express from 'express';
import "express-async-errors" ;
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import setupRoutes from './utils/routes.js';
import db from './utils/db.js';

import errorMiddleware from './middleware/error.js';

const inProduction = process.env.NODE_ENV === 'production';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan(inProduction ? 'combined' : 'dev'));

setupRoutes(app, '/api/v1');

await db.sequelize.sync(inProduction ? undefined : { alter: { drop: true } });

app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));