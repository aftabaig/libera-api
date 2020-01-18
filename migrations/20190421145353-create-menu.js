'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Menus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        i18n: true
      },
      description: {
        type: Sequelize.STRING(1024),
        i18n: true
      },
      openingTime: {
        type: Sequelize.INTEGER
      },
      closingTime: {
        type: Sequelize.INTEGER
      },
      brandId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Brands',
            key: 'id'
        }
      },
      outletId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Outlets',
            key: 'id'
        }
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
    return queryInterface.dropTable('Menus');
  }
};