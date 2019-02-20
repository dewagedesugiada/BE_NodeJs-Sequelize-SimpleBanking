const { Transaction, Account } = require("../db/connection");

exports.getAll = function getAll(callback) {
    Transaction.findAll({
        attributes: ['AccountId', 'TransactionDate', 'Description', 'DebitCreditStatus', 'Amount']
    })
        .then((result) => {
            return callback(null, result);
        })
        .catch((error) => {
            return callback(error);
        });
}

exports.getAmount = function getAmount(id, callback) {
    Transaction.findOne({
        where: { AccountId: id },
        attributes: ['Amount'],
    })
        .then((result) => {
            return callback(null, result.Amount);
        })
        .catch((error) => {
            return callback(error);
        })

}

exports.insert = function insert(data, callback) {
    Transaction.create(data)
        .then((result) => {
            return callback(null, result);
        })
        .catch((error) => {
            return callback(error);
        })
}



exports.insert = function insert(data, callback) {
    Transaction.create(data)
        .then((result) => {
            return callback(null, result);
        })
        .catch((error) => {
            return callback(error);
        })
}

