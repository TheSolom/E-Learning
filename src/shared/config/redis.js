import { Redis } from 'ioredis';

const { REDIS_URI } = process.env;
if (!REDIS_URI) {
    throw new Error('Redis credential not found');
}

const redis = new Redis(REDIS_URI);

export default redis;