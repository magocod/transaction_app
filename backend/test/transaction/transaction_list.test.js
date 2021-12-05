const assert = require("assert");

const supertest = require("supertest");
const app = require("../../app");
const db = require("../../models");

const Transaction = db.transactions;

describe("GET transactions list", function () {
  it("find all", async () => {
    const data = await Transaction.findAll();
    const response = await supertest(app).get("/transactions");
    // .expect(200, done);
    // console.log(response);
    assert.equal(response.status, 200);
    assert.equal(JSON.stringify(response.body), JSON.stringify(data));
  });
});
