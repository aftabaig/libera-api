'use strict';
module.exports = (sequelize, DataTypes) => {
    const ProductVariation = sequelize.define('ProductVariation', {
        name: { 
            type: DataTypes.STRING,
            //i18n: true
        },
        price: DataTypes.FLOAT,
        productId: DataTypes.INTEGER
    }, {});
    ProductVariation.associate = function(models) {
        ProductVariation.belongsToMany(models.Topping, { foreignKey: 'variationId', otherKey: 'toppingId', as: 'toppings', through: models.VariationTopping })
    };
    return ProductVariation;
};