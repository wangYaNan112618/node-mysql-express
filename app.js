var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var register = require('./routes/register');
var regist = require('./routes/regist');
var load = require('./routes/load');
var loader = require('./routes/loader');

var app = express();
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'bdm312622470.my3w.com',
    user     : 'bdm312622470',
    password : 'caiwenduo1993',
    database : 'bdm312622470_db',
    insecureAuth : true
});
connection.connect();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/index', index);
app.use('/users', users);
app.use('/register', register);
app.use('/regist', regist);
app.use('/load', load);
app.use('/loader', loader);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
