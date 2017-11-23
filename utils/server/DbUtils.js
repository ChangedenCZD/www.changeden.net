/**
 * Created by Changeden on 2017/7/18.
 * 数据库工具类
 */
const mysql = require('mysql');
const config = require('../../secret/database.json');
const MAX_THREAD = require('os').cpus().length * 2 + 1;
const MYSQL_CONFIG = {
    connectionLimit: MAX_THREAD,
    host: config.official.host,
    user: config.official.u,
    password: config.official.p,
    database: config.official.db,
    multipleStatements: true
};

/**
 * 连接数据库
 * */

function client () {
    let pool = mysql.createPool(MYSQL_CONFIG);
    return new Promise((resolve) => {
        pool.getConnection((err, connection) => {
            if (err) {
                resolve(mysql.createConnection(MYSQL_CONFIG));
            } else {
                resolve(connection);
            }
        });
    });
}

module.exports = mysql;
module.exports.client = client;