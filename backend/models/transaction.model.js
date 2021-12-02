const { Model } = require("sequelize");

/**
 *
 * @param {Sequelize | sequelize} sequelize
 * @param {sequelize.SequelizeStatic | sequelize} Sequelize
 * @returns {Transaction}
 */
module.exports = (sequelize, Sequelize) => {
  // const Transaction = sequelize.define("transaction", {
  //   title: {
  //     type: Sequelize.STRING,
  //   },
  // });

  // facilitar el typado automatico
  class Transaction extends Model {}
  Transaction.init(
    {
      title: {
        type: Sequelize.STRING,
      },
    },
    { sequelize, modelName: "transaction" }
  );

  return Transaction;
};
