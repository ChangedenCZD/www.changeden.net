/* eslint-disable no-undef */
require('shelljs/global');
var fs = require('fs-extra');

var targetDir = 'public';
var list = fs.readdirSync('dist');
list.forEach((item) => {
    let src = './dist/' + item;
    let target = targetDir + '/' + item;
//    console.log(target + ' 移动完毕!');
    rm('-rf', target);
    if (fs.statSync(src).isDirectory()) {
        mkdir('-p', target);
    }
    fs.copy(src, target, err => {
        if (err) {
            rm('-rf', target);
            console.error(err);
        } else {
//            console.log(target + ' 移动完毕!');
        }
    });
});