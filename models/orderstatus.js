'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderStatus = sequelize.define('OrderStatus', {
    key: DataTypes.STRING,
    title: { 
        type: DataTypes.STRING,
        //i18n: true
    }
  }, {});
  OrderStatus.associate = function(models) {
    // associations can be defined here
  };
  return OrderStatus;
};