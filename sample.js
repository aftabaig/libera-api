//import models from './models';
const models = require('./models');

var fs = require('fs');
var sample = JSON.parse(fs.readFileSync('sample.json', 'utf8'));

var go = async () => {

    const brand = await models.Brand.create({ 'key': 'mcdonalds', name: sample.name, type: 'restaurant' })
    const app = await models.App.create({ identifier: 'mcdonalds', brandId: brand.id });
    const location = { type: 'POINT', coordinates: [sample.longitude, sample.latitude] }
    const outlet = await models.Outlet.create({ brandId: brand.id, name: sample.name, address: '', location: location })

    for (var k in sample.toppings) {
        let topping = sample.toppings[k];
        const newTopping = await models.Topping.create({ 
            externalId: topping.id, 
            name: topping.name, 
            minQuantity: topping.quantity_minimum, 
            maxQuantity: topping.quantity_maximum,
            brandId: brand.id,
            outletId: outlet.id
        });
        let newToppingId = newTopping.id;
        for (const option of topping.options) {
            const newOption = await models.ToppingOption.create({ name: option.name, description: option.description, weight: 1, price: option.price, toppingId: newToppingId })
        }
    }

    for (const menu of sample.menus) {
        const arr1 = menu.opening_time.split(':');
        const arr2 = menu.closing_time.split(':');
        const newMenu = await models.Menu.create({ 
            name: menu.name, 
            description: menu.description, 
            openingTime: arr1[0] * 60 + arr1[1] * 1,
            closingTime: arr2[0] * 60 + arr2[1] * 1,
            brandId: brand.id, 
            outletId: outlet.id  
        })
        for (const category of menu.menu_categories) {
            const newCategory = await models.MenuCategory.create({ name: category.name, description: category.description, menuId: newMenu.id });
            for (const product of category.products) {
                const newProduct = await models.CategoryProduct.create({ name: product.name, description: product.description, categoryId: newCategory.id });
                for (const variation of product.product_variations) {
                    const newVariation = await models.ProductVariation.create({ name: variation.name, price: variation.price, productId: newProduct.id})
                    for (const toppingId of variation.topping_ids) {
                        const topping = await models.Topping.findOne({ where: { externalId: toppingId } })
                        await models.VariationTopping.create({ variationId: newVariation.id, toppingId: topping.id })
                    }
                }
            }
        }
    }
}
go();
