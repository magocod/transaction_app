const assert = require("assert");

const supertest = require("supertest");
const faker = require("faker");

const app = require("../../app");
const db = require("../../models");

const { generate_transaction } = require("../fixtures/transaction");

// const Transaction = db.transactions;

function _baseRequestData() {
  return {
    title: faker.datatype.uuid(),
  };
}

describe("PUT transactions update", function () {
  it("update", async () => {
    const { transaction } = await generate_transaction(db);
    // console.log(instance.toJSON())
    const request = _baseRequestData();
    const response = await supertest(app)
      .put("/transactions/" + transaction.id)
      .send(request);
    await transaction.reload();
    // .expect(200, done);
    // console.log(instance.toJSON())
    // console.log(response.body);
    assert.equal(response.status, 200);
    // assert.equal(response.body, data.dataValues);
  });

  it("form error", async () => {
    const { transaction } = await generate_transaction(db);
    const request = {};
    const response = await supertest(app)
      .put("/transactions/" + transaction.id)
      .send(request);
    // .expect(200, done);
    // console.log(data.toJSON())
    // console.log(response.body);
    assert.equal(response.status, 400);
    assert.deepEqual(response.body, {
      errors: [{ msg: "titulo invalido", param: "title", location: "body" }],
    });
  });
});
