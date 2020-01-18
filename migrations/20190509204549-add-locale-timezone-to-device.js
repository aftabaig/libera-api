'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('Devices', 'locale', {
                type: Sequelize.STRING
            }),
            queryInterface.addColumn('Devices', 'timezone', {
                type: Sequelize.INTEGER
            }),
        ])
    },
    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('Devices', 'locale'),
            queryInterface.removeColumn('Devices', 'timezone'),
        ])
    }
};
