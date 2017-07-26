let express = require('express');
let router = express.Router();
let noticeDao = require('../dao/noticeDao');
/* GET users listing. */
router.get('/official/list', (req, res, next) => {
    noticeDao.officialList(req, res);
});
module.exports = router;
