/**
 * Created by Changeden on 2017/7/18.
 * 数据库工具类
 */
const mysql = require('mysql');
const config = require('../../secret/database.json');
const MAX_THREAD = require('os').cpus().length * 2 + 1;
const MYSQL_CONFIG = {
    connectionLimit: MAX_THREAD,
    host: 'localhost',
    user: config.official.u,
    password: config.official.p,
    database: config.official.db,
    multipleStatements: true
};
let pool = mysql.createPool(MYSQL_CONFIG);
let hasCheckMysqlServer = false;
pool.getConnection((err) => {
    if (err && err.message.indexOf('connect ECONNREFUSED 127.0.0.1') >= 0) {
        console.log('切换为远程数据库');
        MYSQL_CONFIG.host = config.official.host;
        pool = mysql.createPool(MYSQL_CONFIG);
    }
    hasCheckMysqlServer = true;
});

/**
 * 连接数据库
 * */

function client () {
    return new Promise((resolve) => {
        if (hasCheckMysqlServer) {
            getClient(resolve);
        } else {
            let id = setInterval(() => {
                if (hasCheckMysqlServer) {
                    clearInterval(id);
                    getClient(resolve);
                }
            }, 100);
        }
    });
}

function getClient (resolve) {
    if (hasCheckMysqlServer) {
        pool.getConnection((err, connection) => {
            if (err) {
                connection = mysql.createConnection(MYSQL_CONFIG);
            }
            resolve(connection);
        });
    }
}

function destroy (client) {
    if (client) {
        if (client.release && typeof client.release === 'function') {
            client.release();
            console.log(`Database connect is release in ${new Date()}.`);
        } else if (client.end && typeof client.end === 'function') {
            client.end();
            console.log(`Database connect is end in ${new Date()}.`);
        }
    }
    client = null;
}

module.exports = mysql;
module.exports.client = client;
module.exports.destroy = destroy;