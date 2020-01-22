const Sequelize = require('sequelize');
const SequelizeI18N = require('sequelize-i18n');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
console.log(__dirname);

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} 
else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

/*
const i18n = new SequelizeI18N(sequelize, {
    languages: [ 'EN' , 'UR' ],
    defaultLanguage: 'EN'
});
i18n.init();
*/

const models = {
    Address: sequelize.import('./address'),
    App: sequelize.import('./app'),
    Brand: sequelize.import('./brand'),
    Device: sequelize.import('./device'),
    Outlet: sequelize.import('./outlet'),
    Topping: sequelize.import('./topping'),
    ToppingOption: sequelize.import('./toppingoption'),
    User: sequelize.import('./user'),
    Menu: sequelize.import('./menu'),
    MenuCategory: sequelize.import('./menucategory'),
    CategoryProduct: sequelize.import('./categoryproduct'),
    ProductVariation: sequelize.import('./productvariation'),
    VariationTopping: sequelize.import('./variationtopping'),
};

Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
