'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        mobile: DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        avatarUrl: DataTypes.STRING,
        role: DataTypes.STRING,
    }, {});
    User.associate = function(models) {
        User.hasMany(models.Device, { foreignKey: 'userId', as: 'devices' })
    };
    return User;
};