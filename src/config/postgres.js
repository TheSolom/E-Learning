import { Sequelize } from 'sequelize';

if (!process.env.POSTGRES_URI) {
    throw new Error('POSTGRES_URI environment variable must be set');
}

const sequelize = new Sequelize(process.env.POSTGRES_URI, {
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