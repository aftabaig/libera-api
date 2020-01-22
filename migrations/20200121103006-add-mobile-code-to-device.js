'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Devices', 'mobileCode', {
            type: Sequelize.STRING
        })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Devices', 'mobileCode');
    }
};
