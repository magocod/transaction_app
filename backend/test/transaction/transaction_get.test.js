const assert = require("assert");

const supertest = require("supertest");
const faker = require("faker");

const app = require("../../app");
const db = require("../../models");

const { generate_transaction } = require("../fixtures/transaction");

describe("GET transactions find one", function () {
  it("by id", async () => {
    const { transaction } = await generate_transaction(db);
    // console.log(instance.toJSON());
    const response = await supertest(app).get(
      "/transactions/" + transaction.id
    );
    await transaction.reload();
    // .expect(200, done);
    // console.log(instance.toJSON());
    // console.log(response.body);
    assert.equal(response.status, 200);
    assert.deepEqual(
      JSON.stringify(response.body),
      JSON.stringify(transaction.toJSON())
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
