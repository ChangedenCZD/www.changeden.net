/**
 * Created by changeden on 2017/7/18.
 * Redis 工具类
 */
let redis = require('redis');
function set (key, value, expire) {
    let client = redis.createClient();
    client.set(key, value, 'EX', expire || 86400);
    client.quit();
}
function get (key) {
    let client = redis.createClient();
    let value = client.get(key);
    client.quit();
    return value;
}