/**
 * Created by Changeden on 2017/7/18.
 * 文章持久化
 */
let {DbUtils, ResUtils, RedisUtils, UsersUtils} = require('../utils/server/Utils');

function officialList (req, res) {
    let size = req.query.size || 14;
    let sql = `SELECT * FROM article ORDER BY create_at DESC LIMIT 0,${size}`;
    DbUtils.client.query(sql, [], (err, result) => {
        if (err) {
            ResUtils.error(res, '服务器异常');
        } else {
            ResUtils.success(res, '官网文章列表获取成功', {
                articleList: result
            });
        }
    });
}

module.exports = {
    officialList: officialList
};