const assert = require("assert");

const supertest = require("supertest");
const faker = require("faker");

const { generate_transaction } = require("../fixtures/transaction");
const { syncCreateApp } = require("../../factory");

describe("DELETE transactions delete one", function () {
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
    const response = await supertest(app).delete(
      "/transactions/" + instance.id
    );
    // .expect(200, done);
    // console.log(response.body);
    const data = await Transaction.findByPk(instance.id);
    // console.log(data);
    assert.equal(response.status, 200);
    assert.deepEqual(response.body, {
      message: "transaccion eliminada con exito",
    });
    assert.equal(data, null);
  });

  it("invalid id", async () => {
    const id = faker.random.word();
    const response = await supertest(app).delete("/transactions/" + id);
    // .expect(200, done);
    // console.log(data.toJSON())
    // console.log(response);
    // console.log(response.body);
    assert.equal(response.status, 200);
    assert.deepEqual(response.body, {
      message: `no es posible eliminar transaccion con id=${id}`,
    });
  });
});
