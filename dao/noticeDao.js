/**
 * Created by Changeden on 2017/7/18.
 * 公告持久化
 */
let {DbUtils, ResUtils} = require('../utils/server/Utils');

function officialList (req, res) {
    let size = req.query.size || 14;
    let sql = `SELECT * FROM notice ORDER BY create_at DESC LIMIT 0,${size}`;
    DbUtils.client().query(sql, [], (err, result) => {
        if (err) {
            console.error(err);
            ResUtils.error(res, '服务器异常');
        } else {
            ResUtils.success(res, '官网公告列表获取成功', {
                noticeList: result
            });
        }
    });
}

module.exports = {
    officialList: officialList
};