var express = require('express'),
    logger = require('morgan'),
    mongoose = require('mongoose');

module.exports = function () {

    console.log('connect mongodb...');
    mongoose.connect('mongodb://localhost/oneapp');

    console.log('init expesss...');
    var app = express();

    // view engine setup
    app.set('views', process.cwd() + '/views');
    app.set('view engine', 'jade');

    app.use(logger('dev'));

    // 利用Express托管静态文件
    app.use(express.static(process.cwd() + '/public'));
    //app.use('/static', express.static('public'));

    require('../app/routes/one.route')(app);

    // 处理所有未知的请求
    app.use(function (req, res, next) {
        res.status(404);
        try {
            return res.json('Not Found');
        } catch (e) {
            console.error('404 set header after sent');
        }
    });

    // 统一处理出错的情况
    app.use(function (err, req, res, next) {
        if (!err) {
            return next()
        }
        res.status(500);
        try {
            return res.json(err.message || 'server error');
        } catch (e) {
            console.error('500 set header after sent');
        }
    });

    return app;
};