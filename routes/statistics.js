let express = require('express');
let router = express.Router();
let Url = require('url');
let ResUtils = require('../utils/server/ResUtils');
let TextUtils = require('../utils/server/TextUtils');
router.get('/pv', (req, res) => {
    let url = decodeURIComponent(req.query.url || '');
    if (url) {
        let uri = Url.parse(url);
        let hostname = uri.hostname || '';
        if (!TextUtils.likeIp(hostname)) {
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
        ResUtils.success(res, '提交成功', {});
    } else {
        ResUtils.success(res, '提交成功', {});
    }
});
module.exports = router;