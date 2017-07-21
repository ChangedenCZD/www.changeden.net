let Keys = require('../secret/keys.json');
let {ResUtils, RedisUtils} = require('../utils/server/Utils');

function check (req, res, cb) {
    let token = req.header(Keys.request_header_token);
    RedisUtils.get(token, (err, account) => {
        if (err) {
            ResUtils.error(res, '服务器异常');
        } else if (account) {
            let obj = {
                account: account
            };
            if (cb) {
                cb(obj);
            } else {
                ResUtils.success(res, '登录身份有效', obj);
            }
        } else {
            RedisUtils.remove(token);
            ResUtils.error(res, '登录身份已过期', 401);
        }
    });
}

module.exports = {
    check: check
};