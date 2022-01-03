const assert = require("assert");

const db = require("../models");

/**
 *
 * @type {User}
 */
const User = db.User;

/**
 *
 * @type {Profile}
 */
const Profile = db.Profile;

const faker = require("faker");

// https://github.com/sequelize/express-example/issues/90

describe("orm_many_to_many", function () {
    it("create relationship", async () => {
        const user = await User.create({ name: faker.datatype.uuid() });
        // console.log(user.toJSON())
        const profile = await Profile.create({ name: faker.animal.fish() });
        // console.log(profile.toJSON())
        await user.addProfile(profile, { through: { selfGranted: false } })
        const result = await User.findOne({
            where: { name: user.name },
            include: Profile
        });
        // console.log(result.toJSON());
        console.log(JSON.stringify(result, null, 2));
        // assert.equal(typeof user.id, 'number');
    });

    it("create relationship, version 2", async () => {
        const user = await User.create({ name: faker.datatype.uuid() });
        const userB = await User.create({ name: faker.datatype.uuid() });
        // console.log(user.toJSON())
        const profile = await Profile.create({ name: faker.animal.fish() });
        // console.log(profile.toJSON())
        await profile.addUser(user, { through: { selfGranted: false } })
        await profile.addUser(userB, { through: { selfGranted: false } })
        const result = await Profile.findOne({
            where: { name: profile.name },
            include: User
        });
        // console.log(result.toJSON());
        console.log(JSON.stringify(result, null, 2));
        // assert.equal(typeof user.id, 'number');
    });

    it("get relationship, belongsToMany left", async () => {
        const profiles = await Profile.findAll({ include: User });
        console.log(JSON.stringify(profiles, null, 2));
        // assert.equal(typeof user.id, 'number');
    });

    it("get relationship, belongsToMany right", async () => {
        const users = await User.findAll({
            include: [
                {
                    model: Profile, // will create a left join
                },
            ],
        });
        console.log(JSON.stringify(users, null, 2));
        // assert.equal(typeof user.id, 'number');
    });
});