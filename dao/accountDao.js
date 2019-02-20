const { Account } = require("../db/connection");

exports.insert = function insert(data, callback) {
    Account.create(data)
        .then((result) => {
            return callback(null, result);
        })
        .catch((error) => {
            return callback(error);
        })
}

exports.getAll = function getAll(callback) {
    Account.findAll()
        .then((result) => {
            return callback(null, result);
        })
        .catch((error) => {
            return callback(error);
        })
}

exports.getById = function getById(id, callback) {
    Account.findById(id)
        .then((result) => {
            return callback(null, result);
        })
        .catch((error) => {
            return callback(error);
        })
}

exports.update = function update(id, data, callback) {
    Account.update(data, {
        where: { AccountId: data.Account },
        returning: true,
        plain: true
    })
        .then((result) => {
            return callback(null, data);
        })
        .catch((error) => {
            return callback(error);
        })

}

exports.del = function del(id, callback) {
    Account.destroy({
        where: { AccountId: id }
    })
        .then(result => {
            return callback(null, id);
        })
        .catch((error) => {
            console.log(error)
            return callback(error);
        })
}

exports.debit = function debit(AccountId, amount, Description, callback) {
    this.getById(AccountId, function (err, result) {
        if (err) {
            callback(err);
        } else if (result.Balance > amount) {
            var point1 = 0;
            var point2 = 0;
            var point = result.TotalPoint;
            if (Description == "Beli Pulsa") {
                if (amount <= 10000) {
                    point = result.TotalPoint;
                } else {
                    if (amount >= 10001 && amount <= 30000) {
                        point1 = ((amount - 10000) / 1000) * 1;
                    }
                    if (amount > 30000) {
                        point2 = ((amount - 30000) / 1000) * 2;
                        point1 = ((30000 - 10000) / 1000) * 1;
                    }
                }

                point += point1 + point2;
            } else if (Description == "Bayar Listrik") {
                if (amount <= 50000) {
                    point = result.TotalPoint;
                } else {
                    if (amount >= 50001 && amount <= 100000) {
                        point1 = ((amount - 50000) / 2000) * 1
                    }
                    if (amount > 100000) {
                        point2 = ((amount - 100000) / 2000) * 2
                        point1 = ((100000 - 50000) / 2000) * 1
                    }
                }

                point += point1 + point2;

            }

            Account.update({
                Balance: (result.Balance - amount),
                TotalPoint: (point)
            },
                { where: { AccountId: AccountId } }
            )
                .then((account) => {
                    return callback(null, result)
                })
                .catch((error) => {
                    return callback(error);
                })
        } else {
            callback('your balance is insufficient');
        }
    });
}

exports.credit = function credit(AccountId, amount, callback) {
    this.getById(AccountId, function (err, result) {
        if (err) {
            callback(err);
        } else {
            if (result) {
                Account.update({
                    Balance: (result.Balance + parseInt(amount))

                },
                    { where: { AccountId: AccountId } }
                )
                    .then((account) => {
                        return callback(null, result)
                    })
                    .catch((error) => {
                        return callback(error);
                    })

            } else {
                callback('account not found');
            }
        }
    });
}