var express = require('express');
var router = express.Router();
let openDao = require('../dao/openDao');
router.get('/permission', (req, res, next) => {
    openDao.userPermissionList(req, res);
});
router.get('/permission/list', (req, res, next) => {
    openDao.platformPermissionList(req, res);
});
router.put('/permission', (req, res) => {
    openDao.addPlatformPermission(req, res);
});
module.exports = router;
