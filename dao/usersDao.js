/**
 * Created by Changeden on 2017/7/18.
 * 用户持久化
 */
let MD5 = require('md5');
let Sha256 = require('sha256');
let {DbUtils, TextUtils, ResUtils, RedisUtils} = require('../utils/Utils');
const checkUser = (account, res, cb) => {
    if (account) {
        let sql = 'select case when count(account)>0 then 1 else 0 end e from user where account = ?';
        DbUtils.client.query(sql, [account], (err, result) => {
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
            ResUtils.error(res, '请输入账号');
        } else {
            cb && cb(false);
        }
    }
};
const signUpByAccountAndPassword = (account, password, res) => {
    if (!TextUtils.checkLength(account, 8, 32)) {
        ResUtils.error(res, '账号应为8~32位');
    } else {
        checkUser(account, null, (result) => {
            if (result) {
                ResUtils.error(res, '账号已存在', null, {account: account});
            } else if (!TextUtils.checkLength(password, 8, 32)) {
                ResUtils.error(res, '密码应为8~32位');
            } else {
                let sql = 'insert into user(id,account,password) values(?,?,?)';
                let id = require('../utils/UUIDUtils').v4();
                DbUtils.client.query(sql, [id, account, MD5(password)], (err, result) => {
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
    if (!TextUtils.checkLength(account, 8, 32)) {
        ResUtils.error(res, '账号应为8~32位');
    } else {
        checkUser(account, null, (result) => {
            if (result) {
                if (TextUtils.checkLength(password, 8, 32)) {
                    let sql = 'select * from user where account = ? and password = ?';
                    DbUtils.client.query(sql, [account, MD5(password)], (err, result) => {
                        if (err) {
                            console.error(err);
                            ResUtils.error(res, '登录失败');
                        } else {
                            let user = result[0];
                            let id = user.id;
                            let token = Sha256(user.id + '_' + account + '_' + password + '_' + new Date().getTime());
                            RedisUtils.set(token, account, 86400 * 7);
                            ResUtils.success(res, '登录成功', {
                                id: id,
                                account: account,
                                create_at: user.create_at,
                                accessToken: token
                            });
                        }
                    });
                } else {
                    ResUtils.error(res, '密码应为8~32位');
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