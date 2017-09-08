let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let lessMiddleware = require('less-middleware');
// let index = require('./routes/index');
// let users = require('./routes/users');
let app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    /* res.header('Access-Control-Allow-Origin', '*');
    let path = req.path;
    if (path.startsWith('/api/')) {
        res.header('Access-Control-Allow-Origin', 'https://changeden.net');
        let origin = req.headers.origin || '';
        if (origin.endsWith('.changeden.net') || origin.endsWith('//changeden.net')) {
            res.header('Access-Control-Allow-Origin', origin);
        }
    } */
    res.header('Access-Control-Allow-Origin', 'https://changeden.net');
    next();
    // Access-Control-Allow-Headers:Origin, X-Requested-With, Content-Type, Accept
});
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', require('./routes/index'));
app.use('/api/users', require('./routes/users'));
app.use('/api/advertisement', require('./routes/advertisement'));
app.use('/api/article', require('./routes/article'));
app.use('/api/notice', require('./routes/notice'));
app.use('/api/permission', require('./routes/permission'));
app.use('/api/open', require('./routes/open'));
app.use('/api/project', require('./routes/project'));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    console.log(req);
    // let err = new Error('Not Found');
    // err.status = 404;
    // next(err);
    res.redirect('/404.html?from=' + encodeURIComponent(req.originalUrl));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
global.memory = {};
module.exports = app;
