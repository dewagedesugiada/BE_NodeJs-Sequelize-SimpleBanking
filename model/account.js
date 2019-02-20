module.exports = (sequelize, type) => {
    return sequelize.define("account", {
        AccountId: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Name: type.STRING,
        Balance: {
            type: type.DOUBLE,
            defaultValue : 0
        },

        TotalPoint: type.INTEGER
    }, {
            tableName: 'account',
            timestamps: false
        })
}