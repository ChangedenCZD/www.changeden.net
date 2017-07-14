var fs = require('fs-extra');
var path = require('path');
var glob = require('glob');
var readline = require('readline');

var arguments = process.argv.splice(2);
let targetModel = arguments[0];
let filter = arguments[1] || 'vue';

function hasTarget(content) {
    let index = content.indexOf(targetModel);
    return [index >= 0, index];
}
if (targetModel) {
    console.log('================== Information ==================\n');
    console.log('Find usages by key = "' + targetModel + '".\n');
    console.log('Files filter is "*.' + filter + '".\n');
    console.log('===================== Result ====================\n');
    var targetDir = path.resolve(__dirname, './src');
    var globPath = targetDir + '/**/*.' + filter;
    glob.sync(globPath).forEach((entry) => {
        var isExistTarget = false;
        var lineCount = 1;
        var lineIndex = [];
        var rl = readline.createInterface({
            input: fs.createReadStream(entry, { enconding: 'utf8' }),
            output: null
        });
        rl.on('line', function(lineContent) {
            let result = hasTarget(lineContent);
            if (result[0]) {
                isExistTarget = true;
                lineIndex.push(lineCount + ':' + result[1]);
            }
            lineCount++;
        }).on('close', () => {
            if (isExistTarget) {
                console.log(entry.substr(__dirname.length) + ' Lines：' + lineIndex.join(' '));
                console.log('_________________________________________________________________________________\n');
            }
        });
    });
}
