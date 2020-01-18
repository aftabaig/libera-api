'use strict';
module.exports = (sequelize, DataTypes) => {
    const Device = sequelize.define('Device', {
        userId: DataTypes.INTEGER,
        appId: DataTypes.INTEGER,
        type: DataTypes.STRING,
        manufacturer: DataTypes.STRING,
        model: DataTypes.STRING,
        expoToken: DataTypes.STRING,
        apnToken: DataTypes.STRING,
        appVersion: DataTypes.STRING,
        installationId: DataTypes.STRING,
        locale: DataTypes.STRING,
        timezone: DataTypes.INTEGER,
        mobileCode: DataTypes.STRING,
        isLinked: DataTypes.BOOLEAN
    }, {});
    Device.associate = function(models) {
        Device.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
        Device.hasMany(models.Address, { foreignKey: 'deviceId', as: 'addresses' })
    };
    return Device;
};