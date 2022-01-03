const assert = require("assert");

const db = require("../models");

/**
 *
 * @type {User}
 */
const User = db.User;

/**
 *
 * @type {Address}
 */
const Address = db.Address;

const faker = require("faker");

describe("orm_one_to_one", function () {
  it("create relationship", async () => {
    const user = await User.create({ name: faker.datatype.uuid() });
    console.log(user.toJSON());
    const address = await Address.create({
      name: faker.datatype.uuid(),
      userId: user.id,
    });
    console.log(address.toJSON());
    // assert.equal(typeof user.id, 'number');
  });

  it("get relationship, belongsTo", async () => {
    const address = await Address.findAll({ include: User });
    console.log(JSON.stringify(address, null, 2));
    // assert.equal(typeof user.id, 'number');
  });

  it("get relationship, hasOne", async () => {
    const users = await User.findAll({
      include: [
        {
          model: Address, // will create a left join
        },
      ],
    });
    console.log(JSON.stringify(users, null, 2));
    // assert.equal(typeof user.id, 'number');
  });
});
