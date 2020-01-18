'use strict';
module.exports = (sequelize, DataTypes) => {
    const App = sequelize.define('App', {
        identifier: DataTypes.STRING,
        brandId: DataTypes.INTEGER
    }, {});
    App.associate = function(models) {
        
    };
    return App;
};