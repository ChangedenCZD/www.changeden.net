var express = require('express');
var router = express.Router();
let tokenDao = require('../dao/tokenDao');
/* GET home page. */
router.get('/', function (req, res, next) {
    // res.render('index', { title: 'Express' });
    res.redirect('/index.html');
});
router.get('/check', (req, res, next) => {
    tokenDao.check(req, res);
});
module.exports = router;
