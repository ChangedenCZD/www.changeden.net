/**
 * Created by Changeden on 2017/7/19.
 * 用户操作工具类
 */
let MD5 = require('md5');
let Keys = require('../../secret/keys.json');
let Numbers = require('../../secret/number.json');
let TextUtils = require('./TextUtils');

function genAccount (account) {
    return Keys.account_key + account;
}

function genPassword (password) {
    return MD5(Keys.password_key + password);
}

function checkAccountLength (account) {
    let result = {};
    if (!(result.pass = TextUtils.checkLength(account, Numbers.accountMinLength, Numbers.accountMaxLength))) {
        result.message = '账号应为' + Numbers.accountMinLength + '~' + Numbers.accountMaxLength + '位';
    }
    return result;
}

function checkPasswordLength (password) {
    let result = {};
    if (!(result.pass = TextUtils.checkLength(password, Numbers.passwordMinLength, Numbers.passwordMaxLength))) {
        result.message = '密码应为' + Numbers.passwordMinLength + '~' + Numbers.passwordMaxLength + '位';
    }
    return result;
}

module.exports = {
    genAccount: genAccount,
    genPassword: genPassword,
    checkAccountLength: checkAccountLength,
    checkPasswordLength: checkPasswordLength
};