const assert = require("assert");

const supertest = require("supertest");
const faker = require("faker");

const { syncCreateApp } = require("../../factory");

function _baseRequestData() {
  return {
    title: faker.datatype.uuid(),
  };
}

describe("POST transactions create", function () {
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

  it("create", async () => {
    const request = _baseRequestData();
    const response = await supertest(app).post("/transactions").send(request);
    const data = await Transaction.findByPk(response.body.id);
    // .expect(200, done);
    // console.log(data.toJSON());
    // console.log(response.body);
    assert.equal(response.status, 200);
    // assert.equal(JSON.stringify(response.body), JSON.stringify(data.toJSON()));
  });

  it("form error", async () => {
    const request = {};
    const response = await supertest(app).post("/transactions").send(request);
    // .expect(200, done);
    // console.log(data.toJSON())
    // console.log(response.body);
    assert.equal(response.status, 400);
    assert.deepEqual(response.body, {
      errors: [{ msg: "titulo invalido", param: "title", location: "body" }],
    });
  });
});
