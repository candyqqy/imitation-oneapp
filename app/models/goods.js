/**
 * Created by violet_qqy on 16/1/9.
 */

var mongoose = require('mongoose');
var GoodsSchema = require('../schemas/goods');
var Goods = mongoose.model('Goods', GoodsSchema);

module.exports = Goods;