'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Task.belongsTo(models.User, {
        foreignKey: 'userId'
      });
    }
  }
  Task.init({
    name: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      references: {
        // This is a reference to another model
        model: 'User',
        // This is the column name of the referenced model
        key: 'id',
      }
    },
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};