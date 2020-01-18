'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'Outlets',
        'brandId',
        {
            type: Sequelize.INTEGER,
            references: {
                model: 'Brands',
                key: 'id'
            }
        }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
        'Outlets',
        'brandId'
    )
  }
};
