/**
 * Created by Changeden on 2017/7/18.
 * 数据库工具类
 */
const mysql = require('mysql');
const config = require('../secret/db.json');
/**
 * 连接数据库
 * */
const client = (() => {
    return mysql.createConnection({
        host: config.official_web_site.host.remote,
        user: config.official_web_site.admin.account,
        password: config.official_web_site.admin.password,
        database: config.official_web_site.name
    });
})();
module.exports = mysql;
module.exports.client = client;