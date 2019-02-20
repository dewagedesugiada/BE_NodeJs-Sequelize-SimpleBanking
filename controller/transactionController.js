const transactionDao = require("../dao/transactionDao");
const accountDao = require("../dao/accountDao");

const response = require("../response/response");

exports.getTransactions = function (req, res) {
    transactionDao.getAll(function (err, result) {
        if (err) {
            response.err(err);
        } else {
            response.success(result, res);
        }
    })
}

exports.getByAccount = function (req, res) {
    transactionDao.getAmount(req.params['id'], function (err, result) {
        if (err) {
            response.err(err);
        } else {
            response.success(result, res);
        }
    });
}

exports.insertTransaction = function (req, res) {
    const body = req.body;
    if (body.Description != "Setor Tunai") {
        accountDao.debit(body.AccountId, body.Amount, body.Description, function (err, result) {
            if (err) {
                response.err(err, res);
            } else {
                body.DebitCreditStatus = "D";
                transactionDao.insert(body, function (error, result2) {
                    if (error) {
                        console.log('error call insert : ' + error);
                        response.err(error, res);
                    } else {

                        response.success('transaction success', res);
                    }
                });
            }
        })
    } else {
        accountDao.credit(body.AccountId, body.Amount, function (err, result) {
            if (err) {
                response.err(err, res);
            } else {
                let creadit = body;
                creadit.DebitCreditStatus = "C"
                transactionDao.insert(creadit, function (error, result2) {
                    if (error) {
                        console.log('error call insert : ' + error);
                        response.err(error, res);
                    } else {

                        response.success('transaction success', res);
                    }
                });
            }
        })


    }

}
