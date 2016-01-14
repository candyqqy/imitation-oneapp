/**
 * Created by violet_qqy on 16/1/9.
 */
var mongoose = require('mongoose');

module.exports = function () {
    mongoose.connect('mongodb://localhost/oneapp');
};