import redis from "../config/redis.js";

export async function getOrSet(key, callback) {
    return new Promise((resolve, reject) => {
        redis.get(key, (error, cachedValue) => {
            if (error) {
                reject(error);
            } else if (cachedValue) {
                resolve(JSON.parse(cachedValue));
            } else {
                callback()
                    .then((data) => {
                        redis.set(key, JSON.stringify(data));
                        resolve(data);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            }
        });
    });
}

export async function get(key) {
    return JSON.parse(await redis.get(key));
}

export async function set(key, value) {
    await redis.set(key, JSON.stringify(value));
}

export async function remove(key) {
    await redis.del(key);
}
