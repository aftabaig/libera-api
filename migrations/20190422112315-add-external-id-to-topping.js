'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'Toppings', 
            'externalId', {
                type: Sequelize.INTEGER
            }
        )    
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
            'Toppings',
            'externalId'
        )
    }
};
