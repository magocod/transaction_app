/**
 *
 * @param {Sequelize | sequelize} sequelize
 * @param {sequelize.SequelizeStatic | sequelize} Sequelize
 * @returns {*}
 */
module.exports = (sequelize, Sequelize) => {
  const Transaction = sequelize.define("transaction", {
    title: {
      type: Sequelize.STRING,
    },
  });

  return Transaction;
};
