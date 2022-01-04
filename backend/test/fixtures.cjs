// https://mochajs.org/#global-setup-fixtures
// https://github.com/sequelize/sequelize/issues/6758

/**
 *
 * @type {DbInstance | {Transaction: Transaction; readonly default: DbInstance}}
 */
let db;
// const db = require("../models");

exports.mochaGlobalSetup = async function () {
  // console.log(`before all tests`);
  db = require("../models");
};

exports.mochaGlobalTeardown = async function () {
  // console.log('after all tests');
  await db.sequelize.close();
};
