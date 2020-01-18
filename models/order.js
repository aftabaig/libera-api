'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    userId: DataTypes.INTEGER,
    outletId: DataTypes.INTEGER,
    brandId: DataTypes.INTEGER,
    deliveryFee: DataTypes.FLOAT,
    discount: DataTypes.FLOAT,
    total: DataTypes.FLOAT
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
  };
  return Order;
};