/**
 * @author Changeden
 * 用于给html追加时间戳，便于判断是否存在缓存
 */
let path = require('path');
let glob = require('glob');
let fs = require('fs-extra');
let targetDir = path.resolve(__dirname, './dist');
let globPath = targetDir + '/**/*.html';
console.log('开始追加时间戳');
let template = `<meta charset="utf-8">
    <meta name="keywords" content="Changeden,Bunny,兔子人,兔子人网,BunnyDB,音像博物馆"/>
    <meta name="msvalidate.01" content="AC0E663067CF8FE26107AC0A55C376C6"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="format-detection" content="telephone=no,email=no,adress=no">
    <meta name="author" content="Changeden">
    <meta itemprop="name" content="兔子人网-Changeden.net">
    <meta itemprop="image" content="/static/img/icon_bunny_large.png">
    <meta itemprop="description" name="description" content="兔子人网-Changeden.net：一直致力于打造更多开源项目；Powered by Changeden">
    <meta http-equiv="content-language" content="ll-cc"> 
    <meta http-equiv="Cache-Control" content="no-cache"/>
    <meta http-equiv="Pragma" content="no-cache"/>
    <meta http-equiv="Expires" content="0"/>`;
glob.sync(globPath).forEach((entry) => {
    console.log(entry);
    fs.readFile(entry, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        let date = new Date();
        let result = data.replace(/<\/title>/g, '-Changeden.net</title><script type="text/javascript">if(window.location.protocol === \'http:\' && window.location.hostname !== \'localhost\'){ window.location.protocol = \'https:\';}console.log("version",window.HtmlCreateAt="' + date + '");</script>' + template);
        result += '<!--' + date + '-->';
        result = result.replace(/<body>/g, '<body><h1 style="display:none;">兔子人网-Changeden.net</h1>');
        fs.writeFile(entry, result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });
});
console.log('追加完毕');
targetDir = 'dist/static/img/';
let list = fs.readdirSync('src/assets/img');
list.forEach((item) => {
    let target = targetDir + item;
    fs.copy('src/assets/img/' + item, target, err => {
        if (err) return console.error(err);
        console.log(item + ' 移动完毕!');
    });
});