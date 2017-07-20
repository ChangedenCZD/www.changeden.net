/**
 * Created by Changeden on 2017/7/19.
 * 用户操作工具类
 */
let UsersUtils = require('../server/UsersUtils');
let StorageUtils = require('./StorageUtils');
let KEY_USER_INFO = 'userInfo';

function saveUserInfo (user) {
    StorageUtils.set(KEY_USER_INFO, user);
}

function getUserInfo () {
    return StorageUtils.get(KEY_USER_INFO) || {};
}

module.exports = {
    genAccount: UsersUtils.genAccount,
    genPassword: UsersUtils.genPassword,
    checkAccountLength: UsersUtils.checkAccountLength,
    checkPasswordLength: UsersUtils.checkPasswordLength,
    saveUserInfo: saveUserInfo,
    getUserInfo: getUserInfo
};