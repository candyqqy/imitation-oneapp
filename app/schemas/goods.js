/**
 * Created by violet_qqy on 16/1/9.
 */

var mongoose = require('mongoose');

var GoodsSchema = new mongoose.Schema({
    title: String,
    content: String,
    imgUrl: String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

GoodsSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.mata.updateAt = Date.now();
    }
    next();
});

GoodsSchema.statics = {
    fetch: function (cb) {
        return this
            .find({});
            //.sort('meta.updateAt');
        exec(cb);
    },
    findById: function (id, cb) {
        return this
            .findOne({_id: id});
        exec(cb);
    }
};

module.exports = GoodsSchema;



