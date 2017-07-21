var express = require('express');
var router = express.Router();
let openDao = require('../dao/openDao');
router.get('/permission', (req, res, next) => {
    openDao.permissionList(req, res);
});
module.exports = router;
