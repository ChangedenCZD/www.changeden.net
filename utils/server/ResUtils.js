/**
 * Created by Changeden on 2017/7/18.
 * 接口响应工具类
 */
function resObj (code, message, result) {
    return {
        code: code,
        result: result,
        message: message,
        timeStamp: new Date().getTime()
    };
}

function success (res, message, result) {
    res.json(resObj(0, message, result));
}

function error (res, message, code, result) {
    res.json(resObj(code || -1, message, result));
}

function errorCode (code, message) {
    return {
        code: code,
        message: message
    };
}

const ERROR_CODE = {
    IllegalArgumentException: errorCode(1001, '无效参数'),
    ServerException: errorCode(-1, '服务器异常')
};
module.exports = ERROR_CODE;
module.exports.success = success;
module.exports.error = error;