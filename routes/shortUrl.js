let express = require('express');
let router = express.Router();
let ResUtils = require('../utils/server/ResUtils');
let TextUtils = require('../utils/server/TextUtils');
let RedisUtils = require('../utils/server/RedisUtils');
let md5 = require('md5');
const STM = TextUtils.stringToNumber;
const success = ResUtils.success;
const error = ResUtils.error;
const redisGet = RedisUtils.get;
const redisSet = RedisUtils.set;
const REDIS_KEY = 'short_link_';
router.get('/encode', (req, res) => {
    let url = decodeURIComponent(req.query.url || '');
    if (TextUtils.checkUrl(url)) {
        let key = md5(url).toUpperCase();
        let redisKey = `${REDIS_KEY + key}`;
        redisGet(redisKey, (err, result) => {
            if (err) {
                console.error(err);
            }
            if (result) {
                onGetShortLinkSuccess(res, result);
            } else {
                result = `${tenToHex(STM(key))}${url.length}${tenToHex(STM(url))}`;
                let sql = `insert into short_link(md5,url,result) values('${key}','${url}','${result}')`;
                mysqlClient().query(sql, [], (err) => {
                    if (err && err.message.indexOf('Duplicate entry') < 0) {
                        console.error(err);
                        onGetShortLinkError(res, ResUtils.ServerException);
                    } else {
                        redisSet(`${REDIS_KEY + result}`, url, 86400 * 7);
                        redisSet(redisKey, result, 86400 * 7);
                        onGetShortLinkSuccess(res, result);
                    }
                });
            }
        });
    } else {
        onGetShortLinkError(res, ResUtils.IllegalArgumentException, {
            'example': '/s/encode?url=https%3A%2F%2Fchansos.com%2Fabout.html',
            'message': 'Url无效'
        });
    }
});

function onGetShortLinkSuccess (res, result) {
    success(res, '短链生成成功', `https://chansos.com/s/${result}`);
}

function onGetShortLinkError (res, exception, result) {
    error(res, exception.message, exception.code, result);
}

/**
 * 10转16进制
 * */
function tenToHex (ten) {
    return ten.toString(16).toUpperCase();
}

router.get('/:shortLink', (req, res, next) => {
    parse(req.params.shortLink || '', (err, url) => {
        if (err) {
            onGetShortLinkError(res, ResUtils.ServerException);
        } else if (url) {
            onDecodeUrlSuccess(res, url);
        } else {
            next();
        }
    });
});
router.get('/decode', (req, res) => {
    let key = decodeURIComponent(req.query.url || '');
    parse(key.substr(key.lastIndexOf('/') + 1), (err, url) => {
        if (err) {
            onGetShortLinkError(res, ResUtils.ServerException);
        } else if (url) {
            success(res, '短链还原成功', url);
        } else {
            onGetShortLinkError(res, ResUtils.IllegalArgumentException, {
                'example': '/s/decode?url=https%3A%2F%2Fchansos.com%2Fs%2F73D30B54',
                'message': 'Url无效'
            });
        }
    });
});

function parse (shortLink, cb) {
    if (shortLink) {
        let redisKey = `${REDIS_KEY + shortLink}`;
        redisGet(redisKey, (err, result) => {
            if (err) {
                console.error(err);
            }
            if (result) {
                cb && cb(null, result);
            } else {
                let sql = `select url from short_link where result='${shortLink}'`;
                mysqlClient().query(sql, [], (err, result) => {
                    if (err) {
                        console.error(err);
                        cb && cb(err);
                    } else {
                        cb && cb(null, result[0] && result[0].url || '');
                    }
                });
            }
        });
    } else {
        cb && cb();
    }
}

function onDecodeUrlSuccess (res, url) {
    res.redirect(url);
}

function mysqlClient () {
    return require('../utils/server/DbUtils').client();
}

module.exports = router;
