var express = require('express');
var swig = require('swig');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var api = require('./routes/api');
var task = require('./routes/task');
var resources = require('./routes/resources');

var app = express();

app.engine('swig', swig.renderFile);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'swig');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api', api);
app.use('/api/task', task);
app.use('/resources', resources);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);

    if (req.type=== 'api') {
      res.send({
        meta: {
          status: 'Error',
          code: err.status,
          message: err.message,
          error: err.stack
        }
      })
    }
    else {
      res.render('error', {
        code: err.status || 500,
        message: err.message,
        error: err.stack
      });
    }
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);

  if (req.type=== 'api') {
    res.send({
      meta: {
        status: 'Error',
        code: err.status,
        message: err.message,
        error: {}
      }
    })
  }
  else {
    res.render('error', {
      code: err.status || 500,
      message: err.message,
      error: {}
    });
  }
});


//module.exports = app;

//var debug = require('debug')('tasklist');
//var app = require('../app');

var server = app.listen(process.env.PORT || 3000, function() {
  console.log('Express server listening on port ' + server.address().port);
});
