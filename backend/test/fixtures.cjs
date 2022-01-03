// https://mochajs.org/#global-setup-fixtures

/**
 *
 * @type {{ sequelize: sequelize.SequelizeStatic | sequelize, Sequelize: Sequelize }}
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
