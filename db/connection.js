const Sequelize = require('sequelize');

const AccountModel = require('../model/account');
const TransactionModel = require("../model/transaction");

const sequelize = new Sequelize('ocbc', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

const Account = AccountModel(sequelize, Sequelize);
const Transaction = TransactionModel(sequelize, Sequelize);
Transaction.belongsTo(Account, { foreignKey: "AccountId", targetKey: "AccountId" });

module.exports = {
    Account,
    Transaction
}