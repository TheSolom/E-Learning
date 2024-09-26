import { Sequelize } from 'sequelize';
import ErrorHandler from "../utils/error.handler.js";

const { POSTGRES_URI, NODE_ENV } = process.env;
if (!POSTGRES_URI) {
    throw new ErrorHandler('Postgres credential not found', 500, null, true);
}

export const sequelize = new Sequelize(POSTGRES_URI, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    // eslint-disable-next-line no-console
    logging: NODE_ENV === 'production' ? false : console.log,
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
});
