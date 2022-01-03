const faker = require("faker");

/**
 *
 * @param {{sequilize: (sequelize.SequelizeStatic|sequelize), Sequilize: sequelize}} db
 * @returns {Promise<{transaction: Transaction}>}
 */
async function generate_transaction(db) {
  const d = {
    title: faker.datatype.uuid(),
  };
  /**
   * @type {Transaction}
   */
  const Transaction = db.Transaction; // models
  /**
   *
   * @type {Transaction}
   */
  const transaction = await Transaction.create(d);
  return { transaction };
}

module.exports = {
  generate_transaction,
};
