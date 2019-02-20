module.exports = function (app) {
    const conntroller = require('../controller/accountController');

    app.route('/accounts').get(conntroller.getAccounts);
    app.route('/account').post(conntroller.insertAccount);
    app.route('/account/:id').get(conntroller.getAccountById);
    app.route('/account').put(conntroller.updateAccount);
    app.route('/account/:id').delete(conntroller.deleteAccount);

}