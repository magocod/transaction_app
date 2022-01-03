'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserProfiles', {
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'users',
            // schema: 'schema'
          },
          key: 'id'
        },
        allowNull: false
      },
      profileId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'profiles',
            // schema: 'schema'
          },
          key: 'id'
        },
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserProfiles');
  }
};
