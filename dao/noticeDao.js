/**
 * Created by Changeden on 2017/7/18.
 * 公告持久化
 */
let {DbUtils, ResUtils, RedisUtils, UsersUtils} = require('../utils/server/Utils');

function officialList (req, res) {
    let sql = 'SELECT * FROM notice ORDER BY create_at DESC LIMIT 0,14';
    DbUtils.client.query(sql, [], (err, result) => {
        if (err) {
            ResUtils.error(res, '服务器异常');
        } else {
            ResUtils.success(res, '官网公告列表获取成功', {
                articleList: result
            });
        }
    });
}

module.exports = {
    officialList: officialList
};