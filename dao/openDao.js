let Permissions = require('../secret/permission.json');
let {DbUtils, ResUtils, UsersUtils, UUIDUtils} = require('../utils/server/Utils');
let tokenDao = require('./tokenDao');

function userPermissionList (req, res, cb) {
    tokenDao.check(req, res, (account) => {
        let sql = 'SELECT up.user_id,up.permission_id, p.descr, p.parent_id,p.level FROM user_permission up LEFT JOIN user u on u.account = ? RIGHT JOIN permission p on up.permission_id = p.id  WHERE u.id = up.user_id and up.status = 1 order by p.level asc;';
        DbUtils.client().query(sql, [UsersUtils.genAccount(account.account)], (err, result) => {
            if (err) {
                console.error(err);
                ResUtils.error(res, '服务器异常');
            } else {
                if (cb) {
                    cb(result, account.account);
                } else {
                    let permissionList = {};
                    let length = result.length;
                    for (let i = 0; i < length; i++) {
                        let item = result[i];
                        let permissionId = item['permission_id'];
                        if (item.level === 1 || permissionId === Permissions.super.name) {
                            permissionList[permissionId] = item;
                            break;
                        } else if (!permissionList[item['parent_id']]) {
                            permissionList[permissionId] = item;
                        }
                    }
                    ResUtils.success(res, '用户权限列表获取成功', {
                        permissionList: permissionList
                    });
                }
            }
        });
    });
}

function platformPermissionList (req, res) {
    userPermissionList(req, res, (result, account) => {
        let length = result.length;
        if (length && result[0].level === 1) { // 超管权限
            let sql = 'SELECT * FROM permission p ORDER BY level';
            DbUtils.client().query(sql, [], (err, result) => {
                if (err) {
                    console.error(err);
                    ResUtils.error(res, '服务器异常');
                } else {
                    ResUtils.success(res, '权限列表获取成功', {
                        permissionList: result,
                        account: account
                    });
                }
            });
        } else {
            ResUtils.error(res, '您没有权限访问该接口');
        }
    });
}

function checkPlatformPermission (req, res, cb) {
    let id = req.body.id || '';
    if (id) {
        let sql = 'select case when count(id)>0 then 0 else 1 end valid from permission where id = ?';
        DbUtils.client().query(sql, [id], (err, result) => {
            if (cb) {
                if (err) {
                    console.error(err);
                    cb(false);
                } else {
                    cb(result[0].valid > 0);
                }
            }
        });
    } else if (cb) {
        cb(true);
    }
}

function addPlatformPermission (req, res) {
    userPermissionList(req, res, (result, account) => {
        let length = result.length;
        if (length && result[0].level === 1) { // 超管权限
            let body = req.body;
            let id = body.id || UUIDUtils.v4();
            checkPlatformPermission(req, res, (valid) => {
                if (valid) {
                    let descr = body.descr;
                    if (descr) {
                        let parentId = body.parentId || 'super_manage'; // 默认为2级权限
                        let level = body.parentId ? 2 : (parseInt(body.level) || 2); // 默认为2级权限
                        let sql = 'insert permission(id,descr,parent_id,level) values(?,?,?,?)';
                        DbUtils.client().query(sql, [id, descr, parentId, level], (err, result) => {
                            if (err) {
                                console.error(err);
                                ResUtils.error(res, '服务器异常');
                            } else {
                                ResUtils.success(res, '权限添加获取成功', {
                                    account: account
                                });
                            }
                        });
                    } else {
                        ResUtils.error(res, '请填写权限描述');
                    }
                } else {
                    ResUtils.error(res, '该权限ID已存在');
                }
            });
        } else {
            ResUtils.error(res, '您没有权限访问该接口');
        }
    });
}

module.exports = {
    userPermissionList: userPermissionList,
    platformPermissionList: platformPermissionList,
    addPlatformPermission: addPlatformPermission
};