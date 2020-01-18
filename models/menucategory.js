'use strict';
module.exports = (sequelize, DataTypes) => {
    const MenuCategory = sequelize.define('MenuCategory', {
        name: { 
            type: DataTypes.STRING,
            //i18n: true
        },
        description: { 
            type: DataTypes.STRING,
            //i18n: true
        },
        menuId: DataTypes.INTEGER
    }, {});
    MenuCategory.associate = function(models) {
        MenuCategory.hasMany(models.CategoryProduct, { foreignKey: 'categoryId', as: 'products' })
    };
    return MenuCategory;
};