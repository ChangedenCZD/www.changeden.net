var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/check/:account', (req, res, next) => {
    let account = req.params.account;
    let dao = require('../dao/usersDao');
    dao.checkUser(account, res);
});
router.put('/account', (req, res, next) => {
    let account = req.body.account || '';
    let password = req.body.password || '';
    let dao = require('../dao/usersDao');
    dao.signUpByAccountAndPassword(account, password, res);
});
router.post('/account', (req, res, next) => {
    let account = req.body.account || '';
    let password = req.body.password || '';
    let dao = require('../dao/usersDao');
    dao.signInByAccountAndPassword(account, password, res);
});
module.exports = router;
