const assert = require("assert");

const supertest = require("supertest");
const faker = require("faker");

const app = require("../../app");
const db = require("../../models");

// const Transaction = db.transactions; // old_models
/**
 * @type {Transaction}
 */
const Transaction = db.Transaction; // models

function _baseRequestData() {
  return {
    title: faker.datatype.uuid(),
  };
}

describe("POST transactions create", function () {
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
