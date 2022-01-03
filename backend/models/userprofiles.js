"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class UserProfiles extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // pass
        }
    }
    UserProfiles.init(
        {},
        {
            sequelize,
            modelName: "UserProfiles",
        }
    );
    return UserProfiles;
};