/**
 * Created by Changeden on 2017/7/19.
 * 用户操作工具类
 */
let UsersUtils = require('../server/UsersUtils');
let StorageUtils = require('./StorageUtils');
let BrowserUtils = require('./BrowserUtils');
let KEY_USER_INFO = 'userInfo';

function saveUserInfo (user) {
    StorageUtils.set(KEY_USER_INFO, user);
}

function getUserInfo () {
    return StorageUtils.get(KEY_USER_INFO) || {};
}

/**
 * 注销/登出
 */
function signOut () {
    StorageUtils.remove(KEY_USER_INFO);
    BrowserUtils.refresh();
}

module.exports = {
    genAccount: UsersUtils.genAccount,
    genPassword: UsersUtils.genPassword,
    checkAccountLength: UsersUtils.checkAccountLength,
    checkPasswordLength: UsersUtils.checkPasswordLength,
    saveUserInfo: saveUserInfo,
    getUserInfo: getUserInfo,
    signOut: signOut
};