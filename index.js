var express = require('express'),
//request = require('request'),
    superagent = require('superagent'),
    cheerio = require('cheerio'),
    app = express(),
    port = process.env.PORT || 3000;

app.set('views', './views');
app.set('view engine', 'jade');
//利用Express托管静态文件
app.use(express.static('./public'));
app.use(express.static('./node_modules'));
//app.use('/static', express.static('public'));

app.listen(3000, function () {
    console.log('One-app start on port : %s', port);
});

app.get('/', function (req, res) {
    //var oneUrl = '';
    // 用 superagent 去抓取 http://wufazhuce.com/one/vol.1139 的内容
    // superagent.get('http://wufazhuce.com/one/vol.1143')
    superagent.get('http://wufazhuce.com/')
        .end(function (err, sres) {
            // 常规的错误处理
            if (err) {
                return next(err);
            }
            var _$ = cheerio.load(sres.text);
            var oneUrl = _$('.carousel-inner .item:first-child a').attr('href');
            console.log(oneUrl);
            superagent.get(oneUrl)
                .end(function (err, sres) {
                    // 常规的错误处理
                    if (err) {
                        return next(err);
                    }

                    // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
                    // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
                    // 剩下就都是 jquery 的内容了

                    var $ = cheerio.load(sres.text);

                    var articlePrincipal = $('.articulo-principal').text();
                    var articleTitle = $('.articulo-titulo').text();
                    var articleAuthor = $('.articulo-autor').text();
                    var articleContent = [];
                    $('.one-articulo .articulo-contenido p').each(function (item, element) {
                        var $element = $(element);
                        articleContent.push({
                            content: $element.text()
                        });
                    });
                    var questionTitle = $('.one-cuestion h4:nth-child(2)').text();
                    var questionAsk = $('.cuestion-contenido:nth-child(3)').text();
                    var questionAnswer = $('.one-cuestion h4:nth-child(6)').text();
                    var questionContent = [];
                    $('.cuestion-contenido p').each(function (item, element) {
                        var $element = $(element);
                        questionContent.push({
                            content: $element.text()
                        });
                    });

                    var vol = $('.one-titulo').text();
                    var day = $('.one-pubdate .dom').text();
                    var year = $('.one-pubdate .may').text();
                    var motto = $('.one-cita').text();
                    res.render('index', {
                        title: 'One 一个',
                        articleContent: articleContent,
                        articlePrincipal: articlePrincipal,
                        articleTitle: articleTitle,
                        articleAuthor: articleAuthor,
                        questionTitle: questionTitle,
                        questionAsk: questionAsk,
                        questionAnswer: questionAnswer,
                        questionContent: questionContent,
                        vol: vol,
                        day: day,
                        year: year,
                        motto: motto
                    });
                });
        });
//res.render('index', {
//    title: 'One首页'
//});
//res.send('Hello World!');
})
;


