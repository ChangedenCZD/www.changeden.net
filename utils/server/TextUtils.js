/**
 * Created by Changeden on 2017/7/18.
 * 文本工具类
 */
function checkLength (text, min, max) {
    return text && text.length >= min && text.length <= max;
}
module.exports = {
    checkLength: checkLength
};