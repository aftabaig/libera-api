'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'Devices',
        'isActive',
        {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
        'Devices',
        'isActive'
    )
  }
};
