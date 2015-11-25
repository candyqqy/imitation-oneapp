var express = require('express'),
    //request = require('request'),
    superagent = require('superagent'),
    cheerio = require('cheerio'),
    app = express();

app.set('views', './views');
app.set('view engine', 'jade');
//利用Express托管静态文件
app.use(express.static('./public'));
app.use(express.static('./node_modules'));
//app.use('/static', express.static('public'));

var server = app.listen(3000, function () {
    var host = server.address().address,
        port = server.address().port;

    console.log('One-app start at http://%s:%s', host, port);
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});


