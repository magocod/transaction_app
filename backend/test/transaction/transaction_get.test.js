const assert = require("assert");

const supertest = require("supertest");
const faker = require("faker");

const { generate_transaction } = require("../fixtures/transaction");
const { syncCreateApp } = require("../../factory");

describe("GET transactions find one", function () {
  /**
   * @type {Express}
   */
  let app;
  /**
   *
   * @type {{sequelize: (sequelize.SequelizeStatic|sequelize), Sequelize: sequelize}}
   */
  let db;
  /**
   * @type {Transaction}
   */
  let Transaction;

  before(async () => {
    const payload = syncCreateApp();
    app = payload.app;
    db = payload.db;

    Transaction = db.sequelize.models.Transaction;
  });

  after(async () => {
    await db.sequelize.close();
  });

  it("by id", async () => {
    const instance = await generate_transaction(db);
    // console.log(instance.toJSON());
    const response = await supertest(app).get("/transactions/" + instance.id);
    await instance.reload();
    // .expect(200, done);
    // console.log(instance.toJSON());
    // console.log(response.body);
    assert.equal(response.status, 200);
    assert.deepEqual(
      JSON.stringify(response.body),
      JSON.stringify(instance.toJSON())
    );
  });

  it("invalid id", async () => {
    const id = faker.random.word();
    const response = await supertest(app).get("/transactions/" + id);
    // .expect(200, done);
    // console.log(data.toJSON())
    // console.log(response.body);
    assert.equal(response.status, 404);
    assert.deepEqual(response.body, {
      message: `no se puede encontrar la transacción con id=${id}.`,
    });
  });
});
