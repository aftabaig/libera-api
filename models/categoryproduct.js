'use strict';
module.exports = (sequelize, DataTypes) => {
    const CategoryProduct = sequelize.define('CategoryProduct', {
        name: { 
            type: DataTypes.STRING,
            i18n: true
        },
        description: { 
            type: DataTypes.STRING,
            //i18n: true
        },
        categoryId: DataTypes.INTEGER
    }, {});
    CategoryProduct.associate = function(models) {
        CategoryProduct.hasMany(models.ProductVariation, { foreignKey: 'productId', as: 'variations' })
    };
    return CategoryProduct;
};