'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.changeColumn(
            'ToppingOptions', 
            'description', {
                type: Sequelize.STRING(1024)
            }
        )    
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.changeColumn(
            'ToppingOptions', 
            'description', {
                type: Sequelize.STRING(1024)
            }
        )
    }
};
