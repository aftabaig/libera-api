'use strict';
module.exports = (sequelize, DataTypes) => {
    const VariationTopping = sequelize.define('VariationTopping', {
        //variationId: DataTypes.INTEGER,
        //toppingId: DataTypes.INTEGER
    }, {});
    VariationTopping.associate = function(models) {
        VariationTopping.belongsTo(models.ProductVariation, { foreignKey: 'id', as: 'variation' });
        VariationTopping.belongsTo(models.Topping, { foreignKey: 'id', as: 'topping' })
    };
    return VariationTopping;
};