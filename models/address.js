'use strict';
module.exports = (sequelize, DataTypes) => {
    const Address = sequelize.define('Address', {
        name: DataTypes.STRING,
        type: DataTypes.STRING,
        address: DataTypes.STRING,
        location: DataTypes.GEOMETRY('POINT'),
        isCurrentLocation: DataTypes.BOOLEAN
    }, {
        defaultScope: {
            where: {
                isCurrentLocation: false
            }
        },
        scopes: {
            dangling(deviceId) {
                return { where: { userId: null, deviceId: deviceId }}
            }
        }
    });
    Address.associate = function(models) {
        Address.belongsTo(models.Device, { foreignKey: 'deviceId', as: 'device' })
        Address.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })

    };
    Address.duplicate = async(device, user, latitude, longitude) => {
        const newPoint = sequelize.literal(`ST_GeomFromText('POINT(${longitude} ${latitude})')`);
        const distance = sequelize.fn('ST_Distance_Sphere', sequelize.col('location'), newPoint);
        const addresses = await Address.findAll({
            where: [
                {},
                sequelize.where(distance, { [sequelize.Sequelize.Op.lte]: 5 }),
                sequelize.where(sequelize.col('deviceId'), device.id),
                sequelize.where(sequelize.col('userId'), user ? user.id: null)
            ]
        })
        if (addresses.length > 0) {
            return addresses[0];
        }
        return null;
    }
    return Address;
};