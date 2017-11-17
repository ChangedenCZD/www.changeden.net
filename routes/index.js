let express = require('express');
let router = express.Router();
router.get('/', (req, res, next) => {
    // res.render('index', { title: 'Express' });
    res.redirect('/index.html');
});
router.get('/favicon.ico', (req, res) => {
    res.redirect('/static/img/icon_bunny_large.png');
});
module.exports = router;
