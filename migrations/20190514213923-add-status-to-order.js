'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Orders', 'statusId', {
            type: Sequelize.INTEGER,
            references: {
                model: 'OrderStatuses',
                key: 'id'
            },
        })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Orders', 'statusId');
    }
};
