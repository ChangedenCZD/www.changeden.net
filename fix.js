/**
* @author Changeden
* 用于给html追加时间戳，便于判断是否存在缓存
*/
var path = require('path');
var glob = require('glob');
var fs = require('fs');
var targetDir = path.resolve(__dirname, './dist');
var globPath = targetDir + '/**/*.html';
console.log('开始追加时间戳');
glob.sync(globPath).forEach((entry) => {
	console.log(entry);
	fs.open(entry, 'a', 0755, (e, fd) => {
		if (e) throw e;
		fs.write(fd, '<!--' + new Date() + '-->', (e) => {
			if (e) throw e;
		})
	})
});
console.log('追加完毕');