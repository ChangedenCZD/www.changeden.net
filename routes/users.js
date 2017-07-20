let express = require('express');
let router = express.Router();
let usersDao = require('../dao/usersDao');
// 检查账号是否存在
router.get('/check/:account', (req, res, next) => {
    let account = req.params.account;
    usersDao.checkUser(account, res);
});
// 注册
router.put('/account', (req, res, next) => {
    let account = req.body.account || '';
    let password = req.body.password || '';
    usersDao.signUpByAccountAndPassword(account, password, res);
});
// 登录
router.post('/account', (req, res, next) => {
    let account = req.body.account || '';
    let password = req.body.password || '';
    usersDao.signInByAccountAndPassword(account, password, res);
});
module.exports = router;
