/**
 * Created by Changeden on 2017/7/18.
 * 文本工具类
 */
function checkLength (text, min, max) {
    return text && text.length >= min && text.length <= max;
}

function checkUrl (url) {
    let regex = /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?/;
    return regex.test(url);
}

/**
 * 字符串转数字
 * */
function stringToNumber (str) {
    let num = 0;
    if (str) {
        str.split('').forEach((_, index) => {
            num += str.charCodeAt(index);
        });
    }
    return num;
}

function likeIp (str) {
    let isIp = false;
    if (str) {
        isIp = true;
        if (str !== 'localhost') {
            let hostPathList = str.split('.');
            (hostPathList || []).forEach((hostPath) => {
                if (isNaN(parseInt(hostPath))) {
                    isIp = false;
                }
            });
        }
    }
    return isIp;
}

module.exports = {
    checkLength: checkLength,
    checkUrl: checkUrl,
    stringToNumber: stringToNumber,
    likeIp: likeIp
};