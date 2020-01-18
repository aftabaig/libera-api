'use strict';
module.exports = (sequelize, DataTypes) => {
    const Outlet = sequelize.define('Outlet', {
        name: { 
            type: DataTypes.STRING,
            //i18n: true
        },
        address: DataTypes.STRING,
        location: DataTypes.GEOMETRY('POINT'),
        currency: DataTypes.STRING
    }, {});
    Outlet.associate = function(models) {
        Outlet.hasMany(models.Menu, { foreignKey: 'outletId', as: 'menus' })
        Outlet.belongsTo(models.Brand, { foreignKey: 'id', as: 'brand', onDelete: 'CASCADE', hooks: true })
    };
    return Outlet;
};