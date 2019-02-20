module.exports = (sequelize, type) => {
    return sequelize.define("transaction", {
        AccountId: {
            type: type.INTEGER,
            references: {
                model: "account",
                key: 'AccountId'
            }
        },
        TransactionDate: type.DATE,
        Description: type.STRING,
        DebitCreditStatus: type.STRING,
        Amount: type.DOUBLE
    }, {
            tableName: 'transaction',
            timestamps: false
        })

}