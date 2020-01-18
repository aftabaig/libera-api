'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Devices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        }
      },
      appId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
            model: 'Apps',
            key: 'id'
        }
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      manufacturer: {
        type: Sequelize.STRING
      },
      model: {
        type: Sequelize.STRING
      },
      expoToken: {
        type: Sequelize.STRING
      },
      apnToken: {
        type: Sequelize.STRING
      },
      appVersion: {
        type: Sequelize.STRING
      },
      installationId: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING
      },
      isLinked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Devices');
  }
};