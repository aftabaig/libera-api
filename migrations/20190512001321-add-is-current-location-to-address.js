'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Addresses', 'isCurrentLocation', {
            defaultValue: false,
            type: Sequelize.BOOLEAN
        })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Addresses', 'isCurrentLocation')
    }
};
