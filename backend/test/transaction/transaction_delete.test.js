const assert = require("assert");

const supertest = require("supertest");
const faker = require("faker");

const app = require("../../app");
const db = require("../../models");

const { generate_transaction } = require("../fixtures/transaction");

// const Transaction = db.transactions; // old_models
const Transaction = db.Transaction; // models

describe("DELETE transactions delete one", function () {
  it("by id", async () => {
    const { transaction } = await generate_transaction(db);
    // console.log(instance.toJSON());
    const response = await supertest(app).delete(
      "/transactions/" + transaction.id
    );
    // .expect(200, done);
    // console.log(response.body);
    const data = await Transaction.findByPk(transaction.id);
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
