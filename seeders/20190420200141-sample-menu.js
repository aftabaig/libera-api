'use strict';
const models = require('../models');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'Brands',
            [
                { key: 'mc-donalds', name: 'McDonald\'s', type: 'restaurant', createdAt: new Date(), updatedAt: new Date() }
            ]
        )
        const brand = await models.Brand.findOne({
            where: {
                key: 'mc-donalds'
            }
        });
        await queryInterface.bulkInsert(
            'Outlets',
            [
                { 
                    brandId: brand.id, 
                    name: 'McDonald\'s Johar Town', 
                    address: 'Al-Hussain Rd, J2 Block Phase 2 Johar Town, Lahore, Punjab', 
                    location: Sequelize.fn('ST_GeomFromText', 'POINT(31.4669616 74.2518574)'),
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ]
        )
        await queryInterface.bulkInsert(
            'Menus',
            [
                { brandId: brand.id, outletId: null, createdAt: new Date(), updatedAt: new Date() }
            ]
        )
        const menu = await models.Menu.findOne({
            where: {
                brandId: brand.id
            }
        })
        await queryInterface.bulkInsert(
            'MenuCategories',
            [
                { menuId: menu.id, name: 'McDonald\'s Week Deals', createdAt: new Date(), updatedAt: new Date() },
                { menuId: menu.id, name: 'Exclusive Discounted Deals', createdAt: new Date(), updatedAt: new Date() },
                { menuId: menu.id, name: 'New Arrival', createdAt: new Date(), updatedAt: new Date() },
                { menuId: menu.id, name: 'Extra Value Meals', createdAt: new Date(), updatedAt: new Date() },
                { menuId: menu.id, name: 'Value Meals', createdAt: new Date(), updatedAt: new Date() },
                { menuId: menu.id, name: 'Sandwiches', createdAt: new Date(), updatedAt: new Date() },
                { menuId: menu.id, name: 'Crispy Chicken', createdAt: new Date(), updatedAt: new Date() },
                { menuId: menu.id, name: 'Happy Meal', createdAt: new Date(), updatedAt: new Date() },
                { menuId: menu.id, name: 'Fries & Nuggets', createdAt: new Date(), updatedAt: new Date() },
                { menuId: menu.id, name: 'Desserts', createdAt: new Date(), updatedAt: new Date() },
                { menuId: menu.id, name: 'Beverages', createdAt: new Date(), updatedAt: new Date() },
                { menuId: menu.id, name: 'Shakes', createdAt: new Date(), updatedAt: new Date() },
            ]
        )
    },

    down: async (queryInterface, Sequelize) => {
        const brand = await models.Brand.findOne({
            where: {
                key: 'mc-donalds'
            }
        });
        const menu = await models.Menu.findOne({
            where: {
                id: brand.id
            }
        });
        await queryInterface.bulkDelete(
            'MenuCategories',
            { menuId: menu.id }
        )
        await queryInterface.bulkDelete(
            'Menus',
            { brandId: brand.id }
        )
        await queryInterface.bulkDelete(
            'Outlets',
            { brandId: brand.id },
        )
        await queryInterface.bulkDelete(
            'Brands',
            { key: 'mc-donalds' },
        )
    }
};
