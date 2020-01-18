export default {
    Query: {
        getMenu: (parent, { outletId }, { models }) => {
            return models.Menu.scope({ method: ['timed', 1100]}).findOne({ 
                where: { 
                    outletId: outletId
                },
                include: [{
                    model: models.MenuCategory,
                    as: 'categories',
                    include: [{
                        model: models.CategoryProduct,
                        as: 'products',
                        include: [{
                            model: models.ProductVariation,
                            as: 'variations',
                            include: [{
                                model: models.Topping,
                                as: 'toppings',
                                include: [{
                                    model: models.ToppingOption,
                                    as: 'options'
                                }]
                            }]
                        }]
                    }]
                }]
            });
        }
    }
}