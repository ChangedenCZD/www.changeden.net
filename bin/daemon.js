let fs = require('fs');
let shell = require('shelljs');
let request = require('request');
let cheerio = require('cheerio');
let Keys = require('../secret/keys.json').taobaoApi;
let Network = require('../secret/network.json');
let ApiClient = require('../utils/server/alibaba/index.js').ApiClient;
const client = new ApiClient({
    'appkey': Keys.appkey,
    'appsecret': Keys.appsecret,
    'REST_URL': Keys.REST_URL
});
let catList = [];
for (let cat = 1; cat < 44; cat++) {
    catList.push(cat);
}

function fetchTBK (cb) {
    fetchTBKBySingleCat(catList, 0, [], (result) => {
        fs.writeFile('./src/resource/tbk.json', JSON.stringify(result), 'utf8', function (err) {
            if (err) return console.error(err);
            cb && cb();
        });
    });
}

function fetchTBKBySingleCat (catList, index, list, cb) {
    client.execute('taobao.tbk.item.get', {
        'format': 'json',
        'fields': 'num_iid,title,pict_url,small_images,reserve_price,zk_final_price,item_url',
        'q': '',
        'cat': `${catList[index]}`,
        'page_size': '20'
    }, (error, response) => {
        if (error) {
            console.error(error);
            fetchTBKNext(catList, index, list, cb);
        } else {
            if (response.results) {
                list = list.concat(response.results['n_tbk_item'] || []);
            }
            fetchTBKNext(catList, index, list, cb);
        }
    });
}

function fetchTBKNext (catList, index, list, cb) {
    if (index < (catList.length - 1)) {
        fetchTBKBySingleCat(catList, index + 1, list, cb);
    } else {
        cb && cb(list);
    }
}

function fetchJHS (cb) {
    client.execute('taobao.ju.items.search', {
        'param_top_item_query': '{"current_page":1,"page_size":100}'
    }, (error, response) => {
        if (error) {
            console.error(error);
            cb && cb();
        } else {
            let result = response.result['model_list'].items || [];
            fs.writeFile('./src/resource/jhs.json', JSON.stringify(result), 'utf8', function (err) {
                if (err) return console.error(err);
                cb && cb();
            });
        }
    });
}

function fetchDG (cb) {
    fetchCoupon(catList, 0, [], (result) => {
        fs.writeFile('./src/resource/dg.json', JSON.stringify(result), 'utf8', function (err) {
            if (err) return console.error(err);
            cb && cb();
        });
    });
}

function fetchCoupon (catList, index, list, cb) {
    client.execute('taobao.tbk.dg.item.coupon.get', {
        'adzone_id': Keys.adzone[0],
        'cat': `${catList[index]}`,
        'page_size': '20'
    }, (error, response) => {
        if (error) {
            console.error(error);
            fetchCouponNext(catList, index, list, cb);
        } else {
            if (response.results) {
                list = list.concat(response.results['tbk_coupon'] || []);
            }
            fetchCouponNext(catList, index, list, cb);
        }
    });
}

function fetchCouponNext (catList, index, list, cb) {
    if (index < (catList.length - 1)) {
        fetchCoupon(catList, index + 1, list, cb);
    } else {
        cb && cb(list);
    }
}

function run () {
    console.log('开始拉取推广内容');
    fetchDG(() => {
        fetchTBK(() => {
            fetchJHS(() => {
                console.log('开始编译推广内容');
                shell.exec(`npm run fixAndMove`, (code, stdout, stderr) => {
                    if (stdout) {
                        console.group('stdout');
                        console.log(stdout);
                        console.groupEnd();
                    } else if (stderr) {
                        console.group('stderr');
                        console.log(stderr);
                        console.groupEnd();
                    }
                    console.log('已生成推广内容');
                });
            });
        });
    });
}

function fetchIdCard () {
    function cb (idCardList) {
        request.get(Network.idCard.fetchUrl2, (err, _, body) => {
            if (err) {
                console.error(err);
            }
            if (body) {
                let $ = cheerio.load(body);
                idCardList = idCardList.concat(parseIdCardBody($('.panel .l3 li')));
            }
            fetchIdCardInfo(idCardList, 0, '', insertIdCardInfo);
        });
    }

    resolveBodyForResult({index: 0, body: '', cb: cb});
}

function resolveBodyForResult (result) {
    let index = result.index;
    let body = result.body;
    let cb = result.cb;
    if (index < 0) {
        let $ = cheerio.load(body);
        let list = parseIdCardBody($('.table-td1')) || [];
        cb && cb(list);
    } else {
        fetchIdCardForArray(index, body, cb).then(resolveBodyForResult);
    }
}

function resolveBodyForArray (resolve, index, body, cb) {
    setTimeout(() => {
        resolve({
            index: index,
            body: body,
            cb: cb
        });
    }, 200);
}

function fetchIdCardForArray (index, body, cb) {
    return new Promise((resolve) => {
        let urlArray = Network.idCard.fetchUrlArray;
        let srcBody = body;
        if (urlArray.length > index) {
            let url = `${Network.idCard.fetchUrlRoot}${urlArray[index]}`;
            request.get(url, (err, _, body) => {
                if (err) {
                    console.error(err);
                }
                if (body) {
                    index++;
                    body = `${srcBody}${body}`;
                    resolveBodyForArray(resolve, index, body, cb);
                }
            });
        } else {
            resolveBodyForArray(resolve, -1, body, cb);
        }
    });
}

function fetchIdCardInfo (idCardList, index, str, cb) {
    str = str || '';
    if (index < idCardList.length) {
        let item = idCardList[index];
        let card = item.card;
        let name = item.name;
        request.post(Network.idCard.SearchUrl, {
            form: {
                userId: card
            },
            json: true
        }, (err, _, body) => {
            if (err) {
                console.error(err);
            }
            let sql = '';
            if (body) {
                let info = JSON.stringify(body || {});
                sql = `insert into id_card(card,info,name,year,month,day,gender,place) values('${card}','${info}','${name}','${body.year || ''}','${body.month || ''}','${body.day || ''}','${body.sex || ''}','${body.place || ''}') ON DUPLICATE KEY UPDATE name='${name}',info='${info}',year='${body.year || ''}',month='${body.month || ''}',day='${body.day || ''}',gender='${body.sex || ''}',place='${body.place || ''}';`;
            } else {
                console.log(card);
            }
            fetchIdCardInfo(idCardList, index + 1, `${str}
            ${sql}`, cb);
        });
    } else {
        cb(str);
    }
}

function insertIdCardInfo (sql) {
    if (sql) {
        mysql().client().then((client) => {
            client.query(sql, [], (err) => {
                if (err) {
                    console.error(err);
                }
                mysql().destroy(client);
                nextTime();
            });
        });
    } else {
        nextTime();
    }
}

function nextTime () {
    setTimeout(() => {
        fetchIdCard();
    }, 5000);
}

function mysql () {
    return require('../utils/server/DbUtils');
}

function parseIdCardBody (eles) {
    let idCardList = [];
    eles.map((_, el) => {
        if (el && el.children && el.children[0] && el.children[0].data) {
            let realInfo = el.children[0].data;
            let name = realInfo.substr(0, realInfo.indexOf(' '));
            let card = realInfo.substr(realInfo.lastIndexOf(' ') + 1);
            if (card) {
                idCardList.push({
                    name: name,
                    card: card
                });
            }
        }
    });
    return idCardList;
}

fetchIdCard();
module.exports = {
    run: run
};