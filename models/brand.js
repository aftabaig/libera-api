'use strict';
module.exports = (sequelize, DataTypes) => {
    const Brand = sequelize.define('Brand', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        key: DataTypes.STRING,
        name: {
            type: DataTypes.STRING,
            //i18n: true
        },
        type: DataTypes.STRING
    });
    Brand.associate = function(models) {
        Brand.hasMany(models.Outlet, { foreignKey: 'brandId', as: 'outlets', onDelete: 'CASCADE', hooks: true })
    };
    return Brand;
};