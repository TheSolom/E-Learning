import { Sequelize } from 'sequelize';

const { POSTGRES_URI, NODE_ENV } = process.env;
if (!POSTGRES_URI) {
    throw new Error('Postgres credential not found');
}

export const sequelize = new Sequelize(POSTGRES_URI, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: NODE_ENV === 'production' ? false : console.log,
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
});
