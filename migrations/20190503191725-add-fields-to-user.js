'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('Users', 'brandId', {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Brands',
                    key: 'id'
                }
            }),
            queryInterface.addColumn('Users', 'outletId', {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Outlets',
                    key: 'id'
                }
            }),
            queryInterface.addColumn('Users', 'role', {
                type: Sequelize.STRING
            })
        ])
    },
    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('Users', 'brandId'),
            queryInterface.removeColumn('Users', 'outletId'),
            queryInterface.removeColumn('Users', 'role'),
        ])
    }
};
