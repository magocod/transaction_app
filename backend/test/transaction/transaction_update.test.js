const assert = require("assert");

const supertest = require("supertest");
const faker = require("faker");

const app = require("../../app");
const db = require("../../models");

const { generate_transaction } = require("../fixtures/transaction");

const Transaction = db.transactions;

function _baseRequestData() {
  return {
    title: faker.datatype.uuid(),
  };
}

describe("PUT transactions update", function () {
  it("update", async () => {
    const instance = await generate_transaction();
    // console.log(instance.toJSON())
    const request = _baseRequestData();
    const response = await supertest(app)
      .put("/transactions/" + instance.id)
      .send(request);
    await instance.reload()
    // .expect(200, done);
    // console.log(instance.toJSON())
    // console.log(response.body);
    assert.equal(response.status, 200);
    // assert.equal(response.body, data.dataValues);
  });

  it("form error", async () => {
    const instance = await generate_transaction();
    const request = {};
    const response = await supertest(app)
      .put("/transactions/" + instance.id)
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
