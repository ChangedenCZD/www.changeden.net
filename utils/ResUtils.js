/**
 * Created by Changeden on 2017/7/18.
 * 接口响应工具类
 */
function resObj (code, message, result) {
    return {
        code: code,
        result: result,
        message: message
    };
}
function success (res, message, result) {
    res.json(resObj(0, message, result));
}
function error (res, message, code, result) {
    res.json(resObj(code || -1, message, result));
}
module.exports = {
    success: success,
    error: error
};