const db = require("../../models");

// const Transaction = db.transactions; // old_models
/**
 * @type {Transaction}
 */
const Transaction = db.Transaction; // models

const faker = require("faker");

/**
 *
 * @returns {Promise<any>}
 */
function generate_transaction() {
    const d = {
        title: faker.datatype.uuid()
    }
    return Transaction.create(d)
}

module.exports = {
    generate_transaction
}