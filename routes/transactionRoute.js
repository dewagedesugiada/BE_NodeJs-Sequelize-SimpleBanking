module.exports = function (app) {
    const controller = require('../controller/transactionController');

    app.route('/transactions').get(controller.getTransactions);
    app.route('/transaction/:id').get(controller.getByAccount);
    app.route('/transaction/').post(controller.insertTransaction);
}