'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('Outlets', 'latitude'),
            queryInterface.removeColumn('Outlets', 'longitude'),
            queryInterface.removeColumn('Addresses', 'latitude'),
            queryInterface.removeColumn('Addresses', 'longitude'),
            queryInterface.addColumn('Outlets', 'location', {
                allowNull: false,
                type: Sequelize.GEOMETRY('POINT')
            }),
            queryInterface.addColumn('Addresses', 'location', {
                allowNull: false,
                type: Sequelize.GEOMETRY('POINT')
            }),
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('Outlets', 'latitude', {
                type: Sequelize.FLOAT
            }),
            queryInterface.addColumn('Outlets', 'longitude', {
                type: Sequelize.FLOAT
            }),
            queryInterface.addColumn('Addresses', 'latitude', {
                type: Sequelize.FLOAT
            }),
            queryInterface.addColumn('Addresses', 'longitude', {
                type: Sequelize.FLOAT
            }),
            queryInterface.removeColumn('Outlets', 'location'),
            queryInterface.removeColumn('Addresses', 'location'),
        ])    
    }
};
