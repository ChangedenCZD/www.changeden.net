let fs = require('fs');
let shell = require('shelljs');
let Keys = require('../secret/keys.json').taobaoApi;
let ApiClient = require('../utils/server/alibaba/index.js').ApiClient;
const client = new ApiClient({
    'appkey': Keys.appkey,
    'appsecret': Keys.appsecret,
    'REST_URL': Keys.REST_URL
});

function fetchTBK (cb) {
    client.execute('taobao.tbk.item.get', {
        'format': 'json',
        'fields': 'num_iid,title,pict_url,small_images,reserve_price,zk_final_price,item_url',
        'q': '',
        'cat': '16,30,23,11,19,14',
        'page_size': '40'
    }, (error, response) => {
        if (error) {
            console.error(error);
            cb && cb();
        } else {
            let result = response.results['n_tbk_item'] || [];
            fs.writeFile('./src/resource/tbk.json', JSON.stringify(result), 'utf8', function (err) {
                if (err) return console.error(err);
                cb && cb();
            });
        }
    });
}

function fetchJHS (cb) {
    client.execute('taobao.ju.items.search', {
        'param_top_item_query': '{"current_page":1,"page_size":40}'
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
    client.execute('taobao.tbk.dg.item.coupon.get', {
        'adzone_id': Keys.adzone[0],
        'cat': '16,30,11',
        'page_size': '40'
    }, (error, response) => {
        if (error) {
            console.error(error);
            cb && cb();
        } else {
            let result = response.results['tbk_coupon'] || [];
            fs.writeFile('./src/resource/dg.json', JSON.stringify(result), 'utf8', function (err) {
                if (err) return console.error(err);
                cb && cb();
            });
        }
    });
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

module.exports = {
    run: run
};