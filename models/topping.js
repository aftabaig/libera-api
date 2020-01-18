'use strict';
module.exports = (sequelize, DataTypes) => {
    const Topping = sequelize.define('Topping', {
        name: { 
            type: DataTypes.STRING,
            //i18n: true
        },
        minQuantity: DataTypes.INTEGER,
        maxQuantity: DataTypes.INTEGER,
        externalId: DataTypes.INTEGER
    }, {});
    Topping.associate = function(models) {
        Topping.hasMany(models.ToppingOption, { foreignKey: 'toppingId', as: 'options' })
    };
    return Topping;
};