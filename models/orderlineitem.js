'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderLineItem = sequelize.define('OrderLineItem', {
    orderId: DataTypes.UUID,
    quantity: DataTypes.INTEGER,
    details: DataTypes.JSONB
  }, {});
  OrderLineItem.associate = function(models) {
    // associations can be defined here
  };
  return OrderLineItem;
};