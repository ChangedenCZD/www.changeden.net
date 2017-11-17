/**
 * Created by Changeden on 2017/7/18.
 * 数据库工具类
 */
const mysql = require('mysql');
const config = require('../../secret/database.json');

/**
 * 连接数据库
 * */

function client () {
    return mysql.createConnection({
        host: config.official.host,
        user: config.official.u,
        password: config.official.p,
        database: config.official.db,
        multipleStatements: true
    });
}

module.exports = mysql;
module.exports.client = client;