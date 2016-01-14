var OneController = require('../controllers/one.controller');

module.exports = function (app) {
    app.route('/')
        .get(OneController.list);
    app.route('/test')
        .get(OneController.test);
};