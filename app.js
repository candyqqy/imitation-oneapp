var express = require('./config/express');

var app = express();

module.exports = app;

// var express = require('express'),
//     superagent = require('superagent'),
//     cheerio = require('cheerio'),
//     logger = require('morgan');
// /**
//  * 自定义路由
//  */
// var router = require('./routes/index');

// var app = express();

// // view engine setup
// app.set('views', './views');
// app.set('view engine', 'jade');

// app.use(logger('dev'));

// // 利用Express托管静态文件
// app.use(express.static('./public'));
// //app.use('/static', express.static('public'));

// app.use('/', router);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// // error handlers

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });

// module.exports = app;