let express = require('express');
let router = express.Router();
let Url = require('url');
let ResUtils = require('../utils/server/ResUtils');
let TextUtils = require('../utils/server/TextUtils');
router.get('/url', (req, res) => {
    let url = decodeURIComponent(req.query.url || '');
    if (url) {
        let uri = Url.parse(url);
        let hostname = uri.hostname || '';
        if (TextUtils.likeIp(hostname)) {
            ResUtils.error(res,
                ResUtils.IllegalArgumentException.message,
                ResUtils.IllegalArgumentException.code,
                {
                    message: 'ip地址不作统计'
                });
        }
        else {
            let sql = `insert into url_statistics(href,pathname,query,hash,hostname,port,protocol,user_agent) values('${uri.href || ''}','${uri.pathname || ''}','${uri.query || ''}','${uri.hash || ''}','${hostname}','${uri.port || ''}','${uri.protocol || ''}','${req.headers['user-agent'] || ''}');`;
            let mysql = require('../utils/server/DbUtils');
            mysql.client().then(client => {
                client.query(sql, [], (err) => {
                    if (err) {
                        console.error(err);
                    }
                    mysql.destroy(client);
                    ResUtils.success(res, '提交成功', {});
                });
            });
        }
    } else {
        ResUtils.error(res,
            ResUtils.IllegalArgumentException.message,
            ResUtils.IllegalArgumentException.code,
            {
                message: '请传入Url'
            });
    }
});
module.exports = router;