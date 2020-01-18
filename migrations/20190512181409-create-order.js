'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Orders', {
            id: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            uuid: {
                allowNull: false,
                defaultValue: Sequelize.literal('uuid_generate_v1()'),
                type: Sequelize.UUID
            },
            currency: {
                allowNull: false,
                type: Sequelize.STRING    
            },
            userId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },
            deviceId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Devices',
                    key: 'id'
                }
            },
            outletId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Outlets',
                    key: 'id'
                }
            },
            brandId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Brands',
                    key: 'id'
                }
            },
            paymentMethod: {
                allowNull: false,
                type: Sequelize.STRING,
                defaultValue: 'cod'
            },
            couponCode: {
                type: Sequelize.STRING
            },
            deliveryFee: {
                type: Sequelize.FLOAT,
                defaultValue: 0.0
            },
            discount: {
                type: Sequelize.FLOAT,
                defaultValue: 0.0
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Orders');
    }
};