import { Sequelize } from 'sequelize';

const { POSTGRES_URI } = process.env;
if (!POSTGRES_URI) {
    throw new Error('Postgres credential not found');
}

const sequelize = new Sequelize(POSTGRES_URI, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: false,
    sync: { alter: true },
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
});

await sequelize.authenticate();

export default sequelize;