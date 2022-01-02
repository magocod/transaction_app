const assert = require("assert");

const db = require("../models");

/**
 *
 * @type {User}
 */
const User = db.User;

/**
 *
 * @type {Task}
 */
const Task = db.Task;


const faker = require("faker");

// https://github.com/sequelize/express-example/issues/90

describe("example_one_to_many", function () {
  it("create relationship", async () => {
      const user = await User.create({ name: faker.datatype.uuid() });
      console.log(user.toJSON())
      const task = await Task.create({ name: faker.datatype.uuid(), userId: user.id });
      console.log(task.toJSON())
      // assert.equal(typeof user.id, 'number');
  });

  it("get relationship, belongsTo", async () => {
    const tasks = await Task.findAll({ include: User });
    console.log(JSON.stringify(tasks, null, 2));
    // assert.equal(typeof user.id, 'number');
  });

  it("get relationship, hasMany", async () => {
    const users = await User.findAll({
      include: [
        {
          model: Task, // will create a left join
        },
      ],
    });
    console.log(JSON.stringify(users, null, 2));
    // assert.equal(typeof user.id, 'number');
  });
});
