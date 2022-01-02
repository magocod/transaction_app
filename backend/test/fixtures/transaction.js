const faker = require("faker");

/**
 *
 * @param {{sequelize: (sequelize.SequelizeStatic|sequelize), Sequelize: sequelize}} db
 * @returns {Transaction}
 */
function generate_transaction(db) {
    /**
     * @type {Transaction}
     */
    const Transaction = db.sequelize.models.Transaction;
    const d = {
        title: faker.datatype.uuid()
    }
    return Transaction.create(d)
}

module.exports = {
    generate_transaction
}