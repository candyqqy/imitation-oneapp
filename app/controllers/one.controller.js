var superagent = require('superagent'),
    cheerio = require('cheerio');

var Goods = require('../models/goods');

module.exports = {
    test: function (req, res) {
        Goods.statics.fetch(function (err, goods) {
            if (err) {
                console.log(err);
            }
            res.send(goods);
        })
    },
    //获取列表
    list: function (req, res, next) {
        // 用 superagent 去抓取 http: //wufazhuce.com/one/vol.1139 的内容
        // superagent.get('http://wufazhuce.com/one/vol.1143')
        superagent.get('http://wufazhuce.com/')
            .end(function (err, sres) {
                // 常规的错误处理
                if (err) {
                    return next(err);
                }
                var oneImage = {};
                var oneArticle = {};
                var oneQuestion = {};
                var _$ = cheerio.load(sres.text);
                var oneUrl = _$('.carousel-inner .item:first-child a').attr('href');
                var articleUrl = _$('.one-articulo-titulo a').attr('href');
                var questionUrl = _$('.one-cuestion-titulo a').attr('href');
                console.log(oneUrl);
                console.log(articleUrl);
                console.log(questionUrl);

                superagent.get(oneUrl)
                    .end(function (err, sres) {
                        // 常规的错误处理
                        if (err) {
                            return next(err);
                        }

                        // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
                        // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
                        // 剩下就都是 jquery 的内容了

                        var $_image = cheerio.load(sres.text);

                        oneImage.vol = $_image('.one-titulo').text(); // 期数
                        oneImage.day = $_image('.one-pubdate .dom').text(); // 日期
                        oneImage.year = $_image('.one-pubdate .may').text(); // 年月
                        oneImage.motto = $_image('.one-cita').text(); // 格言

                        superagent.get(articleUrl)
                            .end(function (err, sres) {
                                // 常规的错误处理
                                if (err) {
                                    return next(err);
                                }

                                var $_article = cheerio.load(sres.text);

                                oneArticle.principal = $_article('.comilla-cerrar').text();
                                oneArticle.title = $_article('.articulo-titulo').text();
                                oneArticle.auther = $_article('.articulo-autor').text();
                                oneArticle.content = $_article('.articulo-contenido').text().replace(/(^\s*)|(\s*$)/g, " ");

                                superagent.get(questionUrl)
                                    .end(function (err, sres) {
                                        // 常规的错误处理
                                        if (err) {
                                            return next(err);
                                        }

                                        var $_question = cheerio.load(sres.text);

                                        oneQuestion.title = $_question('.one-cuestion h4:nth-child(2)').text();
                                        oneQuestion.ask = $_question('.one-cuestion .cuestion-contenido:nth-child(3)').text();
                                        oneQuestion.answer = $_question('.one-cuestion h4:nth-child(6)').text();
                                        oneQuestion.content = $_question('.one-cuestion .cuestion-contenido:nth-child(7)').text();

                                        res.render('index', {
                                            title: '「 ONE · 一个 」',
                                            vol: oneImage.vol,
                                            day: oneImage.day,
                                            year: oneImage.year,
                                            motto: oneImage.motto,
                                            articlePrincipal: oneArticle.principal,
                                            articleTitle: oneArticle.title,
                                            articleAuthor: oneArticle.auther,
                                            articleContent: oneArticle.content,
                                            questionTitle: oneQuestion.title,
                                            questionAsk: oneQuestion.ask,
                                            questionAnswer: oneQuestion.answer,
                                            questionContent: oneQuestion.content,
                                        });
                                    });
                            });
                    });
            });
    }
};