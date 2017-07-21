/**
 * Created by changeden on 2017/7/18.
 * Redis 工具类
 */
const redis = require('redis');

function redisClient () {
    return redis.createClient();
}

function set (key, value, expire) {
    let client = redisClient();
    client.set(key, value || '', 'EX', expire || 86400);
}

function get (key, cb) {
    let client = redisClient();
    client.get(key, (err, result) => {
        cb && cb(err, result);
    });
}

function remove (key) {
    set(key, null, 1);
}

module.exports = {
    set: set,
    get: get,
    remove: remove
};