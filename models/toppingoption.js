'use strict';
module.exports = (sequelize, DataTypes) => {
    const ToppingOption = sequelize.define('ToppingOption', {
        name: { 
            type: DataTypes.STRING,
            i18n: true
        },
        description: { 
            type: DataTypes.STRING,
            //i18n: true
        },
        weight: DataTypes.INTEGER,
        price: DataTypes.FLOAT,
        toppingId: DataTypes.INTEGER
    }, {});
    ToppingOption.associate = function(models) {
    };
    return ToppingOption;
};