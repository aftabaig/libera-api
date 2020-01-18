'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Orders', 'addressId', {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
                model: 'Addresses',
                key: 'id'
            }
        })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Orders', 'addressId');
    }
};
