let Permissions = require('../secret/permission.json');
let {DbUtils, ResUtils, UsersUtils} = require('../utils/server/Utils');
let tokenDao = require('./tokenDao');

function permissionList (req, res) {
    tokenDao.check(req, res, (account) => {
        let sql = 'SELECT up.user_id,up.permission_id, p.descr, p.parent_id,p.level FROM user_permission up LEFT JOIN user u on u.account = ? RIGHT JOIN permission p on up.permission_id = p.id  WHERE u.id = up.user_id and up.status = 1 order by p.level asc;';
        DbUtils.client.query(sql, [UsersUtils.genAccount(account.account)], (err, result) => {
            if (err) {
                ResUtils.error(res, '服务器异常');
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
                ResUtils.success(res, 'pass', {
                    permissionList: permissionList
                });
            }
        });
    });
}

module.exports = {
    permissionList: permissionList
};