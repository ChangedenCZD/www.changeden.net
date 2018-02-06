let express = require('express');
let router = express.Router();
let request = require('request');
let ResUtils = require('../utils/server/ResUtils');
let Network = require('../secret/network.json');
/**
 * 验证身份证号码
 *
 * */
router.get('/id/:id', (req, res) => {
    let id = req.params.id || '';
    if (id) {
        request.post(Network.idCard.SearchUrl, {
            form: {
                userId: id
            },
            json: true
        }, (err, _, body) => {
            if (err) {
                console.error(err);
                ResUtils.error(res, ResUtils.ServerException.message, ResUtils.ServerException.code, {message: '服务器异常'});
            } else {
                if (body.valid === '有') {
                    let info = JSON.stringify(body);
                    let sql = `insert into id_card(card,info,year,month,day,gender,place) values('${id}','${info}','${body.year || ''}','${body.month || ''}','${body.day || ''}','${body.sex || ''}','${body.place || ''}') ON DUPLICATE KEY UPDATE info='${info}',year='${body.year || ''}',month='${body.month || ''}',day='${body.day || ''}',gender='${body.sex || ''}',place='${body.place || ''}'`;
                    mysql().client().then((client) => {
                        client.query(sql, [], (err) => {
                            if (err && err.message.indexOf('Duplicate entry') < 0) {
                                console.error(err);
                            }
                            mysql().destroy(client);
                        });
                    });
                }
                ResUtils.success(res, '身份证号码验证完成', body);
            }
        });
    } else {
        ResUtils.error(res, ResUtils.IllegalArgumentException.message, ResUtils.IllegalArgumentException.code, {message: '身份证号码无效'});
    }
});

function mysql () {
    return require('../utils/server/DbUtils');
}

module.exports = router;