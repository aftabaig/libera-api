'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderStatusLog = sequelize.define('OrderStatusLog', {
    orderId: DataTypes.INTEGER,
    statusId: DataTypes.INTEGER,
    notes: DataTypes.STRING
  }, {});
  OrderStatusLog.associate = function(models) {
    // associations can be defined here
  };
  return OrderStatusLog;
};