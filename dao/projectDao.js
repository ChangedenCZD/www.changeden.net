/**
 * Created by Changeden on 2017/7/18.
 * 公告持久化
 */
let {DbUtils, ResUtils} = require('../utils/server/Utils');

function menuList (req, res) {
    let size = req.query.size || 14;
    let sql = `SELECT * FROM project_menu ORDER BY create_at DESC LIMIT 0,${size}`;
    DbUtils.client().query(sql, [], (err, result) => {
        if (err) {
            console.error(err);
            ResUtils.error(res, '服务器异常');
        } else {
            ResUtils.success(res, '开源计划菜单获取成功', {
                projectMenuList: result
            });
        }
    });
}

function projectList (req, res) {
    let menuId = req.query.menuId || '';
    let sql = `SELECT * FROM project WHERE menu_id = ? ORDER BY create_at DESC`;
    DbUtils.client().query(sql, [menuId], (err, result) => {
        if (err) {
            console.error(err);
            ResUtils.error(res, '服务器异常');
        } else {
            ResUtils.success(res, '计划列表获取成功', {
                projectList: result
            });
        }
    });
}

module.exports = {
    menuList: menuList,
    projectList: projectList
};