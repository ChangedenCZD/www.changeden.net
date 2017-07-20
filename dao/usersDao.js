/**
 * Created by Changeden on 2017/7/18.
 * 用户持久化
 */
let Sha256 = require('sha256');
let {DbUtils, ResUtils, RedisUtils, UsersUtils} = require('../utils/server/Utils');
const checkUser = (account, res, cb) => {
    let accountResult = UsersUtils.checkAccountLength(account);
    if (accountResult.pass) {
        let sql = 'select case when count(account)>0 then 1 else 0 end e from user where account = ?';
        DbUtils.client.query(sql, [UsersUtils.genAccount(account)], (err, result) => {
            if (err) {
                if (res) {
                    ResUtils.error(res, '服务器异常');
                } else {
                    cb && cb(false);
                }
            } else {
                let exist = result[0].e > 0;
                if (res) {
                    ResUtils.success(res, '账号验证成功', {
                        account: account,
                        exist: exist
                    });
                } else {
                    cb && cb(exist);
                }
            }
        });
    } else {
        if (res) {
            ResUtils.error(res, accountResult.message);
        } else {
            cb && cb(false);
        }
    }
};
const signUpByAccountAndPassword = (account, password, res) => {
    let accountResult = UsersUtils.checkAccountLength(account);
    if (!accountResult.pass) {
        ResUtils.error(res, accountResult.message);
    } else {
        checkUser(account, null, (result) => {
            let passwordResult = UsersUtils.checkPasswordLength(password);
            if (result) {
                ResUtils.error(res, '账号已存在', null, {account: account});
            } else if (!passwordResult.pass) {
                ResUtils.error(res, passwordResult.message);
            } else {
                let sql = 'insert into user(id,account,password) values(?,?,?)';
                let id = require('../utils/server/UUIDUtils').v4();
                DbUtils.client.query(sql, [id, UsersUtils.genAccount(account), UsersUtils.genPassword(password)], (err, result) => {
                    if (err) {
                        console.error(err);
                        ResUtils.error(res, '注册失败');
                    } else {
                        ResUtils.success(res, '注册成功', {
                            id: id,
                            account: account
                        });
                    }
                });
            }
        });
    }
};
const signInByAccountAndPassword = (account, password, res) => {
    let accountResult = UsersUtils.checkAccountLength(account);
    if (!accountResult.pass) {
        ResUtils.error(res, accountResult.message);
    } else {
        checkUser(account, null, (result) => {
            if (result) {
                let passwordResult = UsersUtils.checkPasswordLength(password);
                if (passwordResult.pass) {
                    let sql = 'select * from user where account = ? and password = ?';
                    DbUtils.client.query(sql, [UsersUtils.genAccount(account), UsersUtils.genPassword(password)], (err, result) => {
                        if (err) {
                            console.error(err);
                            ResUtils.error(res, '登录失败');
                        } else if (result.length > 0) {
                            let user = result[0];
                            let id = user.id;
                            let token = Sha256(user.id + '_' + account + '_' + password + '_' + new Date().getTime());
                            RedisUtils.set(token, account, 86400 * 7);
                            ResUtils.success(res, '登录成功', {
                                id: id,
                                account: account,
                                create_at: user.create_at.getTime(),
                                accessToken: token
                            });
                        } else {
                            ResUtils.error(res, '账号或密码错误');
                        }
                    });
                } else {
                    ResUtils.error(res, passwordResult.message);
                }
            } else {
                ResUtils.error(res, '账号不存在');
            }
        });
    }
};
module.exports = {
    checkUser: checkUser,
    signUpByAccountAndPassword: signUpByAccountAndPassword,
    signInByAccountAndPassword: signInByAccountAndPassword
};