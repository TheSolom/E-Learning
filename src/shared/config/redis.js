import { Redis } from 'ioredis';
import ErrorHandler from '../utils/error.handler.js';

const { REDIS_URI } = process.env;
if (!REDIS_URI) {
    throw new ErrorHandler('Redis credential not found', 500, null, true);
}

const redis = new Redis(REDIS_URI);

export default redis;