'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Devices', 'fcmToken', {
            type: Sequelize.STRING
        })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Devices', 'fcmToken')
    }
};
