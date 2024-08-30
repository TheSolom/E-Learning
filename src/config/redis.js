import { Redis } from 'ioredis';

if (!process.env.REDIS_URI) {
    throw new Error('REDIS_URI environment variable must be set');
}

const redis = new Redis(process.env.REDIS_URI);

export default redis;