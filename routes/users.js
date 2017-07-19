let express = require('express');
let router = express.Router();
let usersDao = require('../dao/usersDao');
/* GET users listing. */
router.get('/check/:account', (req, res, next) => {
    let account = req.params.account;
    usersDao.checkUser(account, res);
});
router.put('/account', (req, res, next) => {
    let account = req.body.account || '';
    let password = req.body.password || '';
    usersDao.signUpByAccountAndPassword(account, password, res);
});
router.post('/account', (req, res, next) => {
    let account = req.body.account || '';
    let password = req.body.password || '';
    usersDao.signInByAccountAndPassword(account, password, res);
});
module.exports = router;
