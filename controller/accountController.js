const AccountDao = require('../dao/accountDao');
const response = require('../response/response');

exports.getAccounts = function (req, res) {
    AccountDao.getAll(function (err, result) {
        if (err) {
            console.log('error' + err);
            response.err(err, res);
        } else {
            response.success(result, res);
        }
    });
}

exports.insertAccount = function (req, res) {
    AccountDao.insert(req.body, function (err, result) {
        if (err) {
            console.log('error' + err);
            response.err(err, res);
        } else {
            console.log('insert success')
            response.success(result, res);
        }
    });
}

exports.getAccountById = function (req, res) {
    AccountDao.getById(req.params['id'], function (err, result) {
        if (err) {
            console.log('error' + err);
            response.err(err, res);
        } else {
            response.success(result, res);
        }
    });
}

exports.updateAccount = function (req, res) {
    const body = req.body;
    AccountDao.getById(body.AccountId, function (err, data) {
        if (err) {
            console.log('error' + err);
            response.err(err, res);
        } else if (data == null) {
            response.datanotfound("data not found !", res);
        }
        else {
            AccountDao.update(body.AccountId, body, function (error, result) {
                if (err) {
                    console.log('error' + err);
                    response.err(error, res);
                } else {
                    response.success(result, res);
                }
            });
        }
    });
}

exports.deleteAccount = function (req, res) {
    AccountDao.getById(req.params['id'], function (err, data) {
        if (err) {
            console.log('error' + err);
            response.err(err, res);
        } else if (data == null) {
            response.datanotfound("data not found !", res);
        }
        else {
            AccountDao.del(req.params['id'], function (error, result) {
                if (err) {
                    console.log('error' + err);
                    response.err(error, res);
                } else {
                    console.log('delete success');
                    response.success(result, res);
                }
            });
        }
    });
}


