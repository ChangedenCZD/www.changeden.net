let express = require('express');
let router = express.Router();
let articleDao = require('../dao/articleDao');
/* GET users listing. */
router.get('/official/list', (req, res, next) => {
    articleDao.officialList(req, res);
});
module.exports = router;
