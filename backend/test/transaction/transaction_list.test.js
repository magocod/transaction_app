const { assert } = require("chai");

const supertest = require("supertest");
const app = require("../../app");
const db = require("../../models");

// const Transaction = db.transactions; // old_models
const Transaction = db.Transaction; // models

const { generate_transaction } = require("../fixtures/transaction");

describe("GET transactions list", function () {
  it("find all", async () => {
    await generate_transaction(db)
    // const data = await Transaction.findAll(); // fail parallel
    const response = await supertest(app).get("/transactions");
    // .expect(200, done);
    // console.log(response);
    assert.equal(response.status, 200);
    assert.isTrue(Array.isArray(response.body), "response.body")
    // assert.equal(JSON.stringify(response.body), JSON.stringify(data)); // fail parallel
  });
});
