'use strict';
module.exports = (sequelize, DataTypes) => {
    const Menu = sequelize.define('Menu', {
        name: { 
            type: DataTypes.STRING,
            //i18n: true
        },
        description: { 
            type: DataTypes.STRING,
            //i18n: true
        },
        openingTime: DataTypes.INTEGER,
        closingTime: DataTypes.INTEGER,
        brandId: DataTypes.INTEGER,
        outletId: DataTypes.INTEGER
    }, { 
        scopes: {
            timed(value) {
                return {
                    where: {
                        openingTime: {
                            [sequelize.Sequelize.Op.lte]: value
                        },
                        closingTime: {
                            [sequelize.Sequelize.Op.gte]: value
                        }
                    }
                }
            }
        }
    });
    Menu.associate = function(models) {
        Menu.hasMany(models.MenuCategory, { foreignKey: 'menuId', as: 'categories'})
    };
    return Menu;
};