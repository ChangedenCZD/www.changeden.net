let express = require('express');
let router = express.Router();
let usersDao = require('../dao/usersDao');
/* GET users listing. */
router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    res.json({
        id: id
    })
});
module.exports = router;
