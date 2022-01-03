const assert = require("assert");

const supertest = require("supertest");

const { generate_transaction } = require("../fixtures/transaction");
const { createApp } = require("../../factory");
const db = require("../../models");

describe("GET transactions list", function () {
  /**
   * @type {Express}
   */
  let app;
  // /**
  //  *
  //  * @type {{sequelize: (sequelize.SequelizeStatic|sequelize), Sequelize: sequelize}}
  //  */
  // let db;
  /**
   * @type {Transaction}
   */
  let Transaction;

  before(async () => {
    app = createApp();
    // const payload = createApp();
    // app = payload.app;
    // db = payload.db;

    Transaction = db.sequelize.models.Transaction;
  });

  after(async () => {
    await db.sequelize.close();
  });

  it("find all", async () => {
    await generate_transaction(db);
    const data = await Transaction.findAll();
    const response = await supertest(app).get("/transactions");
    // .expect(200, done);
    // console.log(response.body);
    assert.equal(response.status, 200);
    // assert.equal(JSON.stringify(response.body), JSON.stringify(data));
  });
});
