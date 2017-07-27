let express = require('express');
let router = express.Router();
let projectDao = require('../dao/projectDao');
/* GET users listing. */
router.get('/menu/list', (req, res, next) => {
    projectDao.menuList(req, res);
});
router.get('/list', (req, res, next) => {
    projectDao.projectList(req, res);
});
module.exports = router;
