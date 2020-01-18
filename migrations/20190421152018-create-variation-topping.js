'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('VariationToppings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      variationId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'ProductVariations',
            key: 'id'
        }
      },
      toppingId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Toppings',
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
    return queryInterface.dropTable('VariationToppings');
  }
};